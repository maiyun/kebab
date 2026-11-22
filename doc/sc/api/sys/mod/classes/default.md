[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / default

# Class: default

Defined in: [sys/mod.ts:93](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L93)

开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`;

## Constructors

### Constructor

> **new default**(`opt`): `Mod`

Defined in: [sys/mod.ts:154](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L154)

构造函数

#### Parameters

##### opt

选项

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### hint?

`string`

MySQL 优化器 Hint，如 `INDEX(\`t\` \`idx_xx\`)`，注入到 SELECT 后

###### index?

`string` \| `string`[]

框架会自动去重

###### pre?

`string`

MySQL 表前缀或 PostgreSQL Schema 名，优先级：选项 > 类属性 > 配置

###### row?

`Record`\<`string`, `any`\>

###### select?

`string` \| `string`[]

###### where?

`any`

#### Returns

`Mod`

## Properties

### \_contain

> `protected` **\_contain**: \{ `key`: `string`; `list`: `string`[]; \} \| `null` = `null`

Defined in: [sys/mod.ts:130](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L130)

必须追加的数据筛选 key 与 values，仅单表模式有效

***

### \_ctr?

> `protected` `optional` **\_ctr?**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

Defined in: [sys/mod.ts:145](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L145)

ctr 对象

***

### \_data

> `protected` **\_data**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/mod.ts:124](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L124)

模型获取的属性

***

### \_db

> `protected` **\_db**: [`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

Defined in: [sys/mod.ts:139](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L139)

数据库连接对象

***

### \_fieldPrefix

> `protected` **\_fieldPrefix**: `string` = `''`

Defined in: [sys/mod.ts:148](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L148)

主表筛选前缀，优先 alias，其次表名

***

### \_index

> `protected` **\_index**: `string`[] \| `null` = `null`

Defined in: [sys/mod.ts:127](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L127)

当前选择的分表 _ 后缀，多个代表联查

***

### \_jsonUpdates

> `protected` **\_jsonUpdates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:121](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L121)

要在数据库边界序列化的 JSON 字段

***

### \_sql

> `protected` **\_sql**: [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:142](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L142)

Sql 对象

***

### \_total

> `protected` **\_total**: `number`[] = `[]`

Defined in: [sys/mod.ts:136](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L136)

已算出的 total

***

### \_updates

> `protected` **\_updates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:118](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L118)

要 update 的内容

***

### \_$index

> `protected` `static` **\_$index**: `string` \| `string`[] = `''`

Defined in: [sys/mod.ts:112](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L112)

自动 key 冲突目标：MySQL 为索引名；PGSQL 为唯一字段或字段数组，PG 留空使用 _$key，不支持部分或表达式索引

***

### \_$key

> `protected` `static` **\_$key**: `string` = `''`

Defined in: [sys/mod.ts:109](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L109)

设置后将由 _keyGenerator 函数生成唯一字段

***

### \_$partition

> `protected` `static` **\_$partition**: `string`[] = `[]`

Defined in: [sys/mod.ts:106](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L106)

表的分区字段名，如 ['time_push']
只填分区字段，不用额外填写主键；save、remove、refresh 默认会把主键一起加入 WHERE。
读取记录后不要修改主键或分区字段；留空时只使用主键。

***

### \_$pre?

> `protected` `static` `optional` **\_$pre?**: `string`

Defined in: [sys/mod.ts:115](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L115)

前缀，MySQL 时为表前缀（如 prefix_），PostgreSQL 时为 Schema 名。顺序：选项前缀 -> 本前缀 -> 配置文件前缀

***

### \_$primary

> `protected` `static` **\_$primary**: `string` = `'id'`

Defined in: [sys/mod.ts:99](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L99)

主键字段名

***

### \_$table

> `protected` `static` **\_$table**: `string` = `''`

Defined in: [sys/mod.ts:96](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L96)

表名

## Methods

### \_keyGenerator()

> `protected` **\_keyGenerator**(): `string`

Defined in: [sys/mod.ts:2115](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2115)

当 _key 不为空时，则依据继承此方法的方法自动生成填充 key

#### Returns

`string`

***

### all()

#### Call Signature

> **all**(): `Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod` & [`TModRow`](../type-aliases/TModRow.md)\>\>

Defined in: [sys/mod.ts:1321](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1321)

查询模型列表，查询失败返回 false

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod` & [`TModRow`](../type-aliases/TModRow.md)\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod` & [`TModRow`](../type-aliases/TModRow.md)\>\>

Defined in: [sys/mod.ts:1326](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1326)

查询模型字典，查询失败返回 false

##### Parameters

###### key

`string`

用作字典键的结果字段

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Mod` & [`TModRow`](../type-aliases/TModRow.md)\>\>

#### Call Signature

> **all**\<`TExtra`\>(): `Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod` & `TExtra`\>\>

Defined in: [sys/mod.ts:1328](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1328)

查询模型列表，并为查询附加的字段指定类型，查询失败返回 false

##### Type Parameters

###### TExtra

`TExtra` *extends* `object`

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod` & `TExtra`\>\>

#### Call Signature

> **all**\<`TExtra`\>(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod` & `TExtra`\>\>

Defined in: [sys/mod.ts:1333](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1333)

查询模型字典，并为查询附加的字段指定类型，查询失败返回 false

##### Type Parameters

###### TExtra

`TExtra` *extends* `object`

##### Parameters

###### key

`string`

用作字典键的结果字段

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Mod` & `TExtra`\>\>

***

### allArray()

#### Call Signature

> **allArray**(): `Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md)[]\>

Defined in: [sys/mod.ts:1508](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1508)

查询原生行列表，查询失败返回 false

##### Returns

`Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md)[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, [`TModRow`](../type-aliases/TModRow.md)\>\>

Defined in: [sys/mod.ts:1513](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1513)

查询原生行字典，查询失败返回 false

##### Parameters

###### key

`string`

用作字典键的结果字段

##### Returns

`Promise`\<`false` \| `Record`\<`string`, [`TModRow`](../type-aliases/TModRow.md)\>\>

#### Call Signature

> **allArray**\<`TRow`\>(): `Promise`\<`false` \| `TRow`[]\>

Defined in: [sys/mod.ts:1515](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1515)

查询指定行类型的原生行列表，查询失败返回 false

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Returns

`Promise`\<`false` \| `TRow`[]\>

#### Call Signature

> **allArray**\<`TRow`\>(`key`): `Promise`\<`false` \| `Record`\<`string`, `TRow`\>\>

Defined in: [sys/mod.ts:1520](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1520)

查询指定行类型的原生行字典，查询失败返回 false

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### key

`string`

用作字典键的结果字段

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `TRow`\>\>

***

### allCursor()

> **allCursor**\<`T`\>(`count`, `opt`): `Promise`\<`false` \| [`ICursorPage`](../interfaces/ICursorPage.md)\<`T`\>\>

Defined in: [sys/mod.ts:1764](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1764)

读取一批游标数据，多取一条判断后续记录，不使用 OFFSET，不修改原查询
排序字段必须全部非空、同向，且组合唯一；SELECT 中须包含对应字段（同名或指定 keys）

#### Type Parameters

##### T

`T` *extends* `object` = `Record`\<`string`, `unknown`\>

#### Parameters

##### count

`number`

本批数量

##### opt

排序、边界和方向；before 为 true 时读取前一批并恢复展示顺序

###### before?

`boolean`

是否读取边界前一批，须提供 cursor

###### by

`string` \| `string`[]

排序字段，支持表别名

###### cursor?

[`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[]

边界行的字段值，首批省略

###### keys?

`string`[]

SELECT 结果中对应的字段名，默认去掉 by 的表别名

###### order?

`"DESC"` \| `"ASC"`

展示顺序，默认 DESC

#### Returns

`Promise`\<`false` \| [`ICursorPage`](../interfaces/ICursorPage.md)\<`T`\>\>

列表、首末行游标和扫描方向上的 hasMore，数据库错误返回 false

***

### append()

> **append**(`sql`): `this`

Defined in: [sys/mod.ts:2022](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2022)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [sys/mod.ts:1978](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1978)

ORDER BY

#### Parameters

##### c

`string` \| (`string` \| `string`[])[]

字段字符串或数组

##### d?

`"DESC"` \| `"ASC"` = `'DESC'`

排序规则

#### Returns

`this`

***

### contain()

> **contain**(`contain`): `this`

Defined in: [sys/mod.ts:2031](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2031)

设置闭包含数据

#### Parameters

##### contain

设置项

###### key

`string`

###### list

`string`[]

#### Returns

`this`

***

### count()

> **count**(): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1814](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1814)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1835](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1835)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:938](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L938)

创建数据，自动 key 最多尝试 3 次；PGSQL 仅忽略指定字段的唯一冲突

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-错误或重试耗尽,null-其他唯一冲突；PGSQL 的 SQL 错误需要回滚事务

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1910](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1910)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### explain()

获取数查询（SELECT）扫描情况，获取字符串或对象

#### Param

**all**

是否获取完全的情况，默认不获取，只返回扫描情况

#### Call Signature

> **explain**(`all?`): `Promise`\<`string` \| `false`\>

Defined in: [sys/mod.ts:1641](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1641)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1642](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1642)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1956](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1956)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### first()

#### Call Signature

> **first**(`lock`, `array`): `Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:1197](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1197)

获取第一条原生记录，查询失败返回 false，未找到返回 null

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:1202](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1202)

获取第一个模型实例，查询失败返回 false，未找到返回 null

##### Parameters

###### lock?

`boolean`

###### array?

`false`

##### Returns

`Promise`\<`false` \| `Mod` & [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

#### Call Signature

> **first**\<`TRow`\>(`lock`, `array`): `Promise`\<`false` \| `TRow` \| `null`\>

Defined in: [sys/mod.ts:1212](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1212)

获取指定类型的第一条原生记录

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### lock

`boolean`

是否加锁

###### array

`true`

传入 true 返回原生记录

##### Returns

`Promise`\<`false` \| `TRow` \| `null`\>

原生记录，查询失败返回 false，未找到返回 null

#### Call Signature

> **first**\<`TExtra`\>(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `TExtra` \| `null`\>

Defined in: [sys/mod.ts:1219](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1219)

获取第一个模型实例，并为查询附加的字段指定类型

##### Type Parameters

###### TExtra

`TExtra` *extends* `object`

##### Parameters

###### lock?

`boolean`

是否加锁

###### array?

`false`

省略或传入 false 返回模型实例

##### Returns

`Promise`\<`false` \| `Mod` & `TExtra` \| `null`\>

模型实例，查询失败返回 false，未找到返回 null

***

### firstArray()

#### Call Signature

> **firstArray**(`lock?`): `Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:1252](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1252)

获取数据库第一个原生对象

##### Parameters

###### lock?

`boolean`

是否加锁

##### Returns

`Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

原生对象，查询失败返回 false，未找到返回 null

#### Call Signature

> **firstArray**\<`TRow`\>(`lock?`): `Promise`\<`false` \| `TRow` \| `null`\>

Defined in: [sys/mod.ts:1254](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1254)

获取指定类型的第一条原生记录，查询失败返回 false，未找到返回 null

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### lock?

`boolean`

##### Returns

`Promise`\<`false` \| `TRow` \| `null`\>

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [sys/mod.ts:2058](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2058)

获取带 data 的 sql 语句

#### Parameters

##### sql?

`string`

sql 语句

##### data?

`any`[]

数据

#### Returns

`string`

***

### fullJoin()

> **fullJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1898](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1898)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### get()

#### Call Signature

> **get**(`n`): `any`

Defined in: [sys/mod.ts:915](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L915)

获取一个已加载的字段值

##### Parameters

###### n

`string`

字段名

##### Returns

`any`

字段值，未加载时返回 undefined

#### Call Signature

> **get**\<`T`\>(`n`): `T` \| `undefined`

Defined in: [sys/mod.ts:917](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L917)

按指定类型获取一个已加载的字段值，未加载时返回 undefined

##### Type Parameters

###### T

`T`

##### Parameters

###### n

`string`

##### Returns

`T` \| `undefined`

***

### getData()

> **getData**(): `any`[]

Defined in: [sys/mod.ts:2049](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2049)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:2042](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2042)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1987](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1987)

GROUP BY

#### Parameters

##### c

`string` \| `string`[]

字段字符串或数组

#### Returns

`this`

***

### having()

> **having**(`s`): `this`

Defined in: [sys/mod.ts:1947](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1947)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### hint()

> **hint**(`h`): `this`

Defined in: [sys/mod.ts:1938](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1938)

设置 MySQL 优化器 Hint
内容会以 Optimizer Hint 注释语法注入到 SELECT 关键字后
必须在查询入口调用之后、执行方法之前链式调用

#### Parameters

##### h

`string`

Hint 内容

#### Returns

`this`

#### Example

```ts
// 强制走指定索引（最常用）
.hint("INDEX(`supply_date_0_0` `idx_supply_date_query`)")

// 指定某表不用某索引
.hint("NO_INDEX(`supply_date_0_0` `idx_old`)")

// 指定 JOIN 顺序和索引
.hint("JOIN_ORDER(`a` `b`) INDEX(`a` `idx_a`) INDEX(`b` `idx_b`)")

// 指定 JOIN 中某表使用的索引
.hint("JOIN_INDEX(`supply_date_0_0` `idx_supply_date_query`)")

// 多表多索引组合
.hint("INDEX(`t1` `idx_a`) JOIN_INDEX(`t2` `idx_b`)")

// 官方文档: https://dev.mysql.com/doc/refman/8.0/en/optimizer-hints.html
```

***

### innerJoin()

> **innerJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1886](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1886)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### join()

> **join**(`f`, `s?`, `type?`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1850](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1850)

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### type?

`string` = `'INNER'`

类型

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### langText()

> **langText**(`col`, `lang`): `string`

Defined in: [sys/mod.ts:2095](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2095)

获取字段的可用语种文本

#### Parameters

##### col

`string`

字段名

##### lang

`string`

当前请求语种，如 sc

#### Returns

`string`

***

### leftJoin()

> **leftJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1862](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1862)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b?`): `this`

Defined in: [sys/mod.ts:2000](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2000)

LIMIT

#### Parameters

##### a

`number`

起始

##### b?

`number` = `0`

长度

#### Returns

`this`

***

### page()

> **page**(`count`, `page?`): `this`

Defined in: [sys/mod.ts:2011](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2011)

分页

#### Parameters

##### count

`number`

每页条数

##### page?

`number` = `1`

当前页数

#### Returns

`this`

***

### refresh()

> **refresh**(`lock?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:1107](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1107)

刷新当前模型获取最新数据

#### Parameters

##### lock?

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`boolean` \| `null`\>

true 成功，null 记录不存在，false 缺少定位字段或查询失败

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:1175](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1175)

按主键和分区字段删除当前记录

#### Returns

`Promise`\<`boolean`\>

是否成功，缺少定位字段、记录不存在或删除失败返回 false

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1874](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1874)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index?

`string` = `''`

给本表增加 index 分表项

##### pre?

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### save()

> **save**(`where?`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:1139](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1139)

更新 set 的数据到数据库，有未保存数据时才保存

#### Parameters

##### where?

`any`

显式非空筛选条件；省略时使用主键和分区字段值

#### Returns

`Promise`\<`boolean`\>

是否成功，缺少默认定位字段或写入失败返回 false 并保留待写数据

***

### set()

设置一个/多个属性，值为 undefined 则不会被更新

#### Param

**n**

字符串或键/值

#### Param

**v**

可能是数字

#### Call Signature

> **set**\<`T`, `TK`\>(`n`): `void`

Defined in: [sys/mod.ts:879](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L879)

##### Type Parameters

###### T

`T` *extends* `Mod`

###### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### n

`Record`\<`TK`, `T`\[`TK`\] \| `undefined`\>

##### Returns

`void`

#### Call Signature

> **set**\<`T`, `TK`\>(`n`, `v`): `void`

Defined in: [sys/mod.ts:880](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L880)

##### Type Parameters

###### T

`T` *extends* `Mod`

###### TK

`TK` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### n

`TK`

###### v

`T`\[`TK`\]

##### Returns

`void`

***

### toArray()

#### Call Signature

> **toArray**(): [`TModRow`](../type-aliases/TModRow.md)

Defined in: [sys/mod.ts:2063](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2063)

将已加载和已设置的字段复制为一个普通对象

##### Returns

[`TModRow`](../type-aliases/TModRow.md)

#### Call Signature

> **toArray**\<`TC`\>(): [`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & [`TModRow`](../type-aliases/TModRow.md)

Defined in: [sys/mod.ts:2065](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2065)

将字段复制为普通对象，按指定构造器的实例属性提供类型

##### Type Parameters

###### TC

`TC` *extends* new (...`args`) => `object`

##### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & [`TModRow`](../type-aliases/TModRow.md)

#### Call Signature

> **toArray**\<`TRow`\>(): `TRow`

Defined in: [sys/mod.ts:2067](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2067)

将字段复制为指定类型的普通对象

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Returns

`TRow`

***

### total()

> **total**(`f?`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1699](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1699)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f?

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### totalEstimate()

> **totalEstimate**(): `Promise`\<`number` \| `false`\>

Defined in: [sys/mod.ts:1725](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1725)

从 PostgreSQL 执行计划估算查询总行数，移除外层排序和分页，不执行数据扫描
请在应用游标条件前调用；非 PostgreSQL、框架分表联查或查询失败返回 false，绝不回退到 COUNT

#### Returns

`Promise`\<`number` \| `false`\>

近似行数或 false；估算可能偏差很大，不能用于判断有无下一批

***

### union()

> **union**(`f`, `type?`): `this`

Defined in: [sys/mod.ts:1264](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1264)

联合查询表数据

#### Parameters

##### f

`string` \| `string`[] \| [`Sql`](../../../lib/sql/classes/Sql.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

要联合查询的表列表、单个表、sql 对象

##### type?

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`f`): `this`

Defined in: [sys/mod.ts:1294](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1294)

所有联合查询表数据

#### Parameters

##### f

`string` \| `string`[] \| [`Sql`](../../../lib/sql/classes/Sql.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md) \| [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

要联合查询的表列表、单个表、sql 对象

#### Returns

`this`

***

### unsaved()

> **unsaved**(): `boolean`

Defined in: [sys/mod.ts:2086](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2086)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:2075](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2075)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:1032](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1032)

插入数据，如果业务唯一键已存在则更新，保留已有主键和自动 key
PGSQL 为原子 UPSERT，自动 key 只生成一次，SQL 错误需回滚事务
MySQL 分步执行；自动 key 有多个唯一索引时须配置 _$index，整笔原子性由调用方事务保证

#### Parameters

##### conflict

`string` \| `string`[]

已通过 set 赋非 NULL 值的业务唯一字段，不得包含 _$key 或 _$primary；PGSQL 不支持部分或表达式索引

#### Returns

`Promise`\<`boolean`\>

是否成功；至少需要一个可更新字段，失败保留待写数据

***

### where()

> **where**(`s`): `this`

Defined in: [sys/mod.ts:1967](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1967)

是 filter 的别名

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### column()

> `static` **column**(`field`): `object`

Defined in: [sys/mod.ts:219](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L219)

创建字段对象

#### Parameters

##### field

`string`

#### Returns

`object`

##### token

> **token**: `string`

##### type

> **type**: `"column"`

##### value

> **value**: `string`

***

### find()

> `static` **find**\<`T`\>(`db`, `val`, `opt?`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:668](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L668)

根据主键（或 key 字段）获取对象

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### val

`string` \| `number` \| `null`

主键值

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### key?

`boolean`

通过 key 字段获取，默认为 false，即从主键获取

###### lock?

`boolean`

###### pre?

`string`

#### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### getCreate()

> `static` **getCreate**\<`T`\>(`db`, `opt?`): `T`

Defined in: [sys/mod.ts:650](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L650)

获取创建对象，通常用于新建数据库条目

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`T`

***

### insert()

> `static` **insert**(`db`, `cs`, `vs?`, `opt?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:248](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L248)

添加一个序列（允许超过 65536 的占位符会被拆分多次执行）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### cs

`string`[] \| `Record`\<`string`, `any`\>

字段列表

##### vs?

`any`[] \| `any`[][]

数据列表

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### ignore?

`boolean`

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### insertSql()

> `static` **insertSql**(`db`, `cs`, `vs?`, `opt?`): `string`

Defined in: [sys/mod.ts:308](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L308)

获取添加一个序列的模拟 SQL

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### cs

`string`[] \| `Record`\<`string`, `any`\>

字段列表

##### vs?

`any`[] \| `any`[][]

数据列表

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### ignore?

`boolean`

###### index?

`string`

###### pre?

`string`

#### Returns

`string`

***

### json()

> `static` **json**\<`T`\>(`obj`): `T`

Defined in: [sys/mod.ts:237](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L237)

标记 JSON 字段；模型内保持原始对象，写入数据库时再序列化

#### Type Parameters

##### T

`T`

#### Parameters

##### obj

`T`

#### Returns

`T`

***

### one()

#### Call Signature

> `static` **one**(`db`, `s`, `opt`): `Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:698](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L698)

按条件读取一条原生记录，查询失败返回 false，未找到返回 null

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

[`IModOneOptions`](../interfaces/IModOneOptions.md) & `object`

##### Returns

`Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

#### Call Signature

> `static` **one**\<`T`\>(`db`, `s`, `opt?`): `Promise`\<`false` \| `T` & [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:704](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L704)

按条件读取一个模型实例，查询失败返回 false，未找到返回 null

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt?

[`IModOneOptions`](../interfaces/IModOneOptions.md) & `object`

##### Returns

`Promise`\<`false` \| `T` & [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

#### Call Signature

> `static` **one**\<`TRow`\>(`db`, `s`, `opt`): `Promise`\<`false` \| `TRow` \| `null`\>

Defined in: [sys/mod.ts:710](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L710)

按条件读取一条指定类型的原生记录，查询失败返回 false，未找到返回 null

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

[`IModOneOptions`](../interfaces/IModOneOptions.md) & `object`

##### Returns

`Promise`\<`false` \| `TRow` \| `null`\>

***

### oneArray()

#### Call Signature

> `static` **oneArray**(`db`, `s`, `opt?`): `Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

Defined in: [sys/mod.ts:768](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L768)

通过 where 条件筛选单条数据返回原生对象

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

###### s

`any`

筛选条件数组或字符串

###### opt?

`Omit`\<[`IModOneOptions`](../interfaces/IModOneOptions.md), `"by"`\>

查询和加锁选项

##### Returns

`Promise`\<`false` \| [`TModRow`](../type-aliases/TModRow.md) \| `null`\>

原生对象，查询失败返回 false，未找到返回 null

#### Call Signature

> `static` **oneArray**\<`TRow`\>(`db`, `s`, `opt?`): `Promise`\<`false` \| `TRow` \| `null`\>

Defined in: [sys/mod.ts:774](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L774)

按条件读取一条指定类型的原生记录，查询失败返回 false，未找到返回 null

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt?

`Omit`\<[`IModOneOptions`](../interfaces/IModOneOptions.md), `"by"`\>

##### Returns

`Promise`\<`false` \| `TRow` \| `null`\>

***

### primarys()

> `static` **primarys**(`db`, `where?`, `opt?`): `Promise`\<`false` \| `any`[]\>

Defined in: [sys/mod.ts:795](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L795)

根据 where 条件获取主键值列表

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where?

`any` = `''`

where 条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`false` \| `any`[]\>

***

### removeByWhere()

> `static` **removeByWhere**(`db`, `where`, `opt?`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:334](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L334)

根据条件移除条目

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

`Promise`\<`number` \| `false` \| `null`\>

***

### removeByWhereSql()

> `static` **removeByWhereSql**(`db`, `where`, `opt?`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:378](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L378)

根据条件移除条目（仅获取 SQL 对象）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

[`Sql`](../../../lib/sql/classes/Sql.md)

***

### select()

> `static` **select**\<`T`\>(`db`, `c`, `opt?`): `T`

Defined in: [sys/mod.ts:587](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L587)

select 自定字段

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### c

`string` \| `string`[]

字段字符串或字段数组

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T`

***

### toArrayByRecord()

#### Call Signature

> `static` **toArrayByRecord**\<`T`\>(`obj`): `Record`\<`string`, [`TModRow`](../type-aliases/TModRow.md)\>

Defined in: [sys/mod.ts:823](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L823)

将模型字典转换为普通对象字典，沿用原有键

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### obj

`Record`\<`string`, `T`\>

要转换的模型字典

##### Returns

`Record`\<`string`, [`TModRow`](../type-aliases/TModRow.md)\>

转换后的普通对象字典

#### Call Signature

> `static` **toArrayByRecord**\<`TRow`\>(`obj`): `Record`\<`string`, `TRow`\>

Defined in: [sys/mod.ts:827](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L827)

将模型字典转换为指定行类型的普通对象字典

##### Type Parameters

###### TRow

`TRow` *extends* `object`

##### Parameters

###### obj

`Record`\<`string`, `Mod`\>

##### Returns

`Record`\<`string`, `TRow`\>

***

### updateByWhere()

> `static` **updateByWhere**(`db`, `data`, `where`, `opt?`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:411](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L411)

根据条件更新数据

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

`Promise`\<`number` \| `false` \| `null`\>

***

### updateByWhereSql()

> `static` **updateByWhereSql**(`db`, `data`, `where`, `opt?`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:457](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L457)

根据条件更新数据（仅获取 SQL 对象）

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### limit?

\[`number`, `number`?\]

###### pre?

`string`

#### Returns

[`Sql`](../../../lib/sql/classes/Sql.md)

***

### updateList()

> `static` **updateList**(`db`, `data`, `key`, `opt?`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:495](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L495)

批量更新数据

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象；多批次需要整体原子性时应传入 Transaction

##### data

`Record`\<`string`, `any`\>[]

数据列表，每个元素必须包含 key 字段，其余字段为要更新的列；
            支持稀疏数据（不同元素可以拥有不同的列集合），内部会自动按列集合分组批量执行；
            相同 key 会按输入顺序合并，后出现的同名字段覆盖先出现的值

##### key

`string`

用于定位待更新记录的字段名，通常为主键或唯一键，至少必须建立索引；
           该参数是字段名而不是索引名，仅参与 ON / WHERE 条件匹配，不会被更新；
           data 中每个元素都必须包含此字段，否则该元素会被跳过

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名；opt.batchSize: 每批更新条数）

###### batchSize?

`number`

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### value()

> `static` **value**(`val`): `object`

Defined in: [sys/mod.ts:228](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L228)

创建字面量值对象，用于 where 条件中 v[0] 需要是值而非字段名的场景

#### Parameters

##### val

[`DbValue`](../../../index/type-aliases/DbValue.md)

#### Returns

`object`

##### token

> **token**: `string`

##### type

> **type**: `"value"`

##### value

> **value**: [`DbValue`](../../../index/type-aliases/DbValue.md)

***

### where()

> `static` **where**\<`T`\>(`db`, `s?`, `opt?`): `T`

Defined in: [sys/mod.ts:619](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L619)

通过 where 条件获取模型

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### s?

`any` = `''`

筛选条件数组或字符串

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### alias?

`string`

###### contain?

\{ `key`: `string`; `list`: `string`[]; \}

###### contain.key

`string`

###### contain.list

`string`[]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T`
