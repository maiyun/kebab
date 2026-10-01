# 游标分页与 PostgreSQL 近似总数

日志、硬件消息等大量追加记录的列表，可以用 `allCursor()` 顺序读取上一批、下一批，并通过 `totalEstimate()` 展示近似总量。普通 `page()`、`total()` 保持原有行为。

## by() 与 seek()

`by()` 只设置 ORDER BY，支持各字段使用不同的排序方向。`seek(fields, values?, direction?)` 用于非空、同向排序的游标字段：传入 `values` 时，在原 WHERE 后追加参数化边界条件，再调用 `by()` 设置排序；不传 `values` 时，只校验字段并设置排序。

```ts
// --- 首批：相同字段、方向下，两种写法生成相同 SQL ---
base.copy().by(['time_add', 'id'], 'DESC').limit(20);
base.copy().seek(['time_add', 'id']).limit(20);

// --- 下一批：传上一批末行的值，增加 WHERE 边界，无 OFFSET ---
base.copy().seek(['time_add', 'id'], [1700500000, '9007199254740993']).limit(20);
```

最后一条查询在原筛选后追加的条件相当于：

```sql
AND (time_add, id) < (?, ?)
AND time_add <= ?
ORDER BY time_add DESC, id DESC
LIMIT 20
```

这是使用 `?` 表示参数位置的示意；PostgreSQL 实际使用 `$1`、`$2` 等占位符。复合边界中的 ID 区分同一时间的记录；显式首列范围有助于 PostgreSQL 收紧索引扫描边界。升序使用 `>` 和 `>=`。

`seek()` 必须在排序、分页、分组之前调用，不需要再调用 `by()`。它只构建 SQL，业务分页推荐使用模型的 `allCursor()`，由模型处理多取一条和上一批结果的顺序恢复。

## allCursor() 的返回值

`allCursor(count, options)` 多取一条，通过实际查询结果判断还有没有后续记录，返回的 `list` 最多包含 `count` 条。查询失败返回 `false`；成功但无匹配记录时，`list` 为空，两个游标为 `null`。

| 字段 | 含义 |
| --- | --- |
| `list` | 本批数据，始终保持 `order` 指定的展示顺序 |
| `next` | 本批末行的排序字段值，用于读取下一批 |
| `previous` | 本批首行的排序字段值，用于读取上一批 |
| `hasMore` | 沿本次查询方向，是否还有更多记录 |

`next`、`previous` 是行边界，不是翻页许可。第一页的 `previous`、最后一页的 `next` 都可能有值，不能仅凭游标非空启用按钮。

## 首批、下一页与上一页

| 操作 | `cursor` | `before` | 返回的 `hasMore` 表示 |
| --- | --- | --- | --- |
| 首次查询 | 不传 | 不传或 `false` | 是否还有下一页 |
| 下一页 | 当前结果的 `next` | `false` | 是否还有下一页 |
| 上一页 | 当前结果的 `previous` | `true` | 是否还有上一页 |

无论向哪边翻页，`order` 都保持原展示方向。`before: true` 时，框架内部反向扫描，截取本批数据后再反转列表，调用方不用再次反转。

每次查询成功后，都要保存新结果的首末行游标。翻页期间保持筛选条件、结束时间、每批数量和排序不变；筛选或数量变化时重新读取首批。

## 业务侧的翻页按钮

下面以 PostgreSQL 消息模型为例，假设 `db`、`mMessage`、已校验的 `start` 和固定的 `end` 已由调用方提供。实际项目应把实体查询放在自定义 MOD 中。

```ts
import * as lSql from '@maiyunnet/kebab/lib/sql.js';

const query = mMessage.select<mMessage>(db, [
    'm.id::text id', 'm.time_add',
], { 'alias': 'm' }).filter([
    ['m.time_add', '>=', start],
    ['m.time_add', '<=', end],
]);

/**
 * --- 读取一批消息，并将扫描方向转换为上一页、下一页状态 ---
 * @param direction 翻页方向，首次读取使用 next 且不传 cursor
 * @param cursor 当前页的末行或首行游标
 * @returns 分页结果；数据库查询失败返回 false
 */
async function readPage(direction: 'next' | 'prev', cursor?: lSql.TCursorValue[]) {
    const before = direction === 'prev';
    const page = await query.allCursor(20, {
        'by': ['m.time_add', 'm.id'],
        'order': 'DESC',
        'cursor': cursor,
        'before': before,
    });
    if (page === false) {
        return false;
    }
    const returnedRows = page.list.length > 0;
    return {
        'list': page.list,
        'nextCursor': page.next,
        'prevCursor': page.previous,
        'hasNext': before ? !!cursor && returnedRows : page.hasMore,
        'hasPrev': before ? page.hasMore : !!cursor && returnedRows,
    };
}

// --- 首次查询 ---
let current = await readPage('next');

// --- 点击下一页：传当前页末行游标 ---
if (current !== false && current.hasNext && current.nextCursor) {
    const result = await readPage('next', current.nextCursor);
    if (result !== false) {
        current = result;
    }
}

// --- 点击上一页：传当前页首行游标，readPage 内部设置 before: true ---
if (current !== false && current.hasPrev && current.prevCursor) {
    const result = await readPage('prev', current.prevCursor);
    if (result !== false) {
        current = result;
    }
}
```

沿查询方向的按钮状态来自 `hasMore`；另一侧根据“已从那一页翻过来，并且本次返回非空结果”的浏览状态判断，这没有同时扫描两侧。如果业务允许删除历史记录，反方向状态也可能变化；翻页查询失败或原有页面因删除变为空时，界面可以保留原页并提示重新刷新。

例如，每批两条、降序记录为 `92、82、80、79`：首批 `92、82` 有下一页、无上一页；传其 `next` 得到 `80、79`，无下一页、有上一页；再传这一批的 `previous` 并设置 `before: true`，返回 `92、82`。

## 近似总数

`totalEstimate()` 仅支持 PostgreSQL。它移除原 SELECT 的外层 ORDER BY、LIMIT/OFFSET，执行普通 `EXPLAIN (FORMAT JSON)`，读取顶层 `Plan Rows`；不使用 ANALYZE，不执行原 SELECT，也不回退到 COUNT。

```ts
// --- 对基础筛选估算一次，不带游标条件 ---
const estimated = await query.totalEstimate();
const total = estimated === false ? null : estimated;
```

失败、其他数据库、框架分表模式或 contain 返回 `false`，不能解释为总数为零。统计信息陈旧、字段相关性或罕见取值可能导致明显偏差；即使估算为 1，实际查询也可能没有匹配记录。

界面应明确标注近似总数，例如“约 120 万条”，仅首次筛选时估算，翻页复用。按钮由实际分页结果决定，不能根据近似总数计算是否允许继续翻页。首批已经读取完整结果时，可以用 `list.length` 得到精确总数。

展示用途的 JOIN 如果不改变原始记录的筛选或数量，可以对不带 JOIN 的基础实体查询估算；JOIN 参与筛选或产生重复行时，需要先明确统计的对象。

## 字段、索引与限制

- 排序字段必须全部非空、方向一致，且组合唯一，通常使用 `time_add、id`。
- SELECT 必须包含排序字段。`by` 有表别名时，默认从结果中取不带表别名的 key；结果字段改名时，通过 `keys` 显式指定对应关系。
- 大整数在数据库投影时取为字符串，并以字符串传回。不能先由驱动转成不安全的 Number，再 stringify。上例 PostgreSQL 使用 `m.id::text id`，排序仍使用原表数值字段 `m.id`。
- `null`、不安全的数值边界、非法字段和不支持的查询结构会抛出配置错误。字段和排序规则由服务端固定，游标及筛选参数在请求入口校验。
- 支持 PostgreSQL 原生分区表、MySQL 普通表；不支持模型 `index` 分表、contain、分组、UNION 或混合方向排序。`allCursor()` 不修改基础模型查询。
- 典型索引为 `(time_add, id)`，按设备筛选时为 `(no, time_add, id)`。ASC B-tree 支持整体反向扫描，无需为同向降序再重复创建索引。
- 固定结束时间可以减小新增记录对浏览的影响，游标分页不等同于跨请求事务快照，也不提供按任意页码直接跳转。

可运行演示见示例项目的 `test/mod-test`、`test/mod-test?s=pgsql` 和 `test/sql?type=seek`。
