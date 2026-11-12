[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / default

# Class: default

Defined in: [sys/mod.ts:74](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L74)

开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`;

## Constructors

### Constructor

> **new default**(`opt`): `Mod`

Defined in: [sys/mod.ts:135](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L135)

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

Defined in: [sys/mod.ts:111](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L111)

必须追加的数据筛选 key 与 values，仅单表模式有效

***

### \_ctr?

> `protected` `optional` **\_ctr?**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

Defined in: [sys/mod.ts:126](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L126)

ctr 对象

***

### \_data

> `protected` **\_data**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/mod.ts:105](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L105)

模型获取的属性

***

### \_db

> `protected` **\_db**: [`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

Defined in: [sys/mod.ts:120](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L120)

数据库连接对象

***

### \_fieldPrefix

> `protected` **\_fieldPrefix**: `string` = `''`

Defined in: [sys/mod.ts:129](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L129)

主表筛选前缀，优先 alias，其次表名

***

### \_index

> `protected` **\_index**: `string`[] \| `null` = `null`

Defined in: [sys/mod.ts:108](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L108)

当前选择的分表 _ 后缀，多个代表联查

***

### \_jsonUpdates

> `protected` **\_jsonUpdates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:102](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L102)

要在数据库边界序列化的 JSON 字段

***

### \_sql

> `protected` **\_sql**: [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:123](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L123)

Sql 对象

***

### \_total

> `protected` **\_total**: `number`[] = `[]`

Defined in: [sys/mod.ts:117](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L117)

已算出的 total

***

### \_updates

> `protected` **\_updates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:99](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L99)

要 update 的内容

***

### \_$index

> `protected` `static` **\_$index**: `string` \| `string`[] = `''`

Defined in: [sys/mod.ts:93](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L93)

自动 key 冲突目标：MySQL 为索引名；PGSQL 为唯一字段或字段数组，PG 留空使用 _$key，不支持部分或表达式索引

***

### \_$key

> `protected` `static` **\_$key**: `string` = `''`

Defined in: [sys/mod.ts:90](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L90)

设置后将由 _keyGenerator 函数生成唯一字段

***

### \_$partition

> `protected` `static` **\_$partition**: `string`[] = `[]`

Defined in: [sys/mod.ts:87](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L87)

表的分区字段名，如 ['time_push']
只填分区字段，不用额外填写主键；save、remove、refresh 默认会把主键一起加入 WHERE。
读取记录后不要修改主键或分区字段；留空时只使用主键。

***

### \_$pre?

> `protected` `static` `optional` **\_$pre?**: `string`

Defined in: [sys/mod.ts:96](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L96)

前缀，MySQL 时为表前缀（如 prefix_），PostgreSQL 时为 Schema 名。顺序：选项前缀 -> 本前缀 -> 配置文件前缀

***

### \_$primary

> `protected` `static` **\_$primary**: `string` = `'id'`

Defined in: [sys/mod.ts:80](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L80)

主键字段名

***

### \_$table

> `protected` `static` **\_$table**: `string` = `''`

Defined in: [sys/mod.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L77)

表名

## Methods

### \_keyGenerator()

> `protected` **\_keyGenerator**(): `string`

Defined in: [sys/mod.ts:2074](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2074)

当 _key 不为空时，则依据继承此方法的方法自动生成填充 key

#### Returns

`string`

***

### all()

获取列表

#### Param

**key**

是否以某个字段为主键

#### Call Signature

> **all**(): `Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

Defined in: [sys/mod.ts:1297](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1297)

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

Defined in: [sys/mod.ts:1298](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1298)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

***

### allArray()

获取列表（得到的为原生对象或数组，不是模型）

#### Param

**key**

是否以某个字段为主键

#### Call Signature

> **allArray**(): `Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

Defined in: [sys/mod.ts:1476](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1476)

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

Defined in: [sys/mod.ts:1477](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1477)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

***

### allCursor()

> **allCursor**\<`T`\>(`count`, `opt`): `Promise`\<`false` \| [`ICursorPage`](../interfaces/ICursorPage.md)\<`T`\>\>

Defined in: [sys/mod.ts:1725](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1725)

读取一批游标数据，多取一条判断后续记录，不使用 OFFSET，不修改原查询
排序字段必须全部非空、同向，且组合唯一；SELECT 中须包含对应字段（同名或指定 keys）

#### Type Parameters

##### T

`T` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

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

Defined in: [sys/mod.ts:1983](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1983)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [sys/mod.ts:1939](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1939)

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

Defined in: [sys/mod.ts:1992](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1992)

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

Defined in: [sys/mod.ts:1775](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1775)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1796](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1796)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:928](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L928)

创建数据，自动 key 最多尝试 3 次；PGSQL 仅忽略指定字段的唯一冲突

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-错误或重试耗尽,null-其他唯一冲突；PGSQL 的 SQL 错误需要回滚事务

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1871](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1871)

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

Defined in: [sys/mod.ts:1602](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1602)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1603](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1603)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1917](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1917)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### first()

获取数据库第一个对象

#### Param

**lock**

是否加锁

#### Param

**array**

是否返回原生对象

#### Call Signature

> **first**(`lock`, `array`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1186](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1186)

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1190](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1190)

##### Parameters

###### lock?

`boolean`

###### array?

`false`

##### Returns

`Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

***

### firstArray()

> **firstArray**(`lock?`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1230](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1230)

获取数据库第一个原生对象

#### Parameters

##### lock?

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [sys/mod.ts:2019](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2019)

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

Defined in: [sys/mod.ts:1859](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1859)

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

> **get**(`n`): `any`

Defined in: [sys/mod.ts:908](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L908)

获取一个字段值

#### Parameters

##### n

`string`

字段名

#### Returns

`any`

***

### getData()

> **getData**(): `any`[]

Defined in: [sys/mod.ts:2010](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2010)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:2003](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2003)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1948](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1948)

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

Defined in: [sys/mod.ts:1908](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1908)

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

Defined in: [sys/mod.ts:1899](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1899)

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

Defined in: [sys/mod.ts:1847](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1847)

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

Defined in: [sys/mod.ts:1811](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1811)

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

Defined in: [sys/mod.ts:2054](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2054)

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

Defined in: [sys/mod.ts:1823](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1823)

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

Defined in: [sys/mod.ts:1961](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1961)

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

Defined in: [sys/mod.ts:1972](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1972)

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

Defined in: [sys/mod.ts:1097](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1097)

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

Defined in: [sys/mod.ts:1165](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1165)

按主键和分区字段删除当前记录

#### Returns

`Promise`\<`boolean`\>

是否成功，缺少定位字段、记录不存在或删除失败返回 false

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1835](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1835)

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

Defined in: [sys/mod.ts:1129](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1129)

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

Defined in: [sys/mod.ts:873](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L873)

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

Defined in: [sys/mod.ts:874](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L874)

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

> **toArray**\<`TC`\>(): [`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:2026](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2026)

获取值对象，获取的是新创建的数组

#### Type Parameters

##### TC

`TC` *extends* new (...`args`) => `any`

#### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

***

### total()

> **total**(`f?`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1660](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1660)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f?

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### totalEstimate()

> **totalEstimate**(): `Promise`\<`number` \| `false`\>

Defined in: [sys/mod.ts:1686](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1686)

从 PostgreSQL 执行计划估算查询总行数，移除外层排序和分页，不执行数据扫描
请在应用游标条件前调用；非 PostgreSQL、框架分表联查或查询失败返回 false，绝不回退到 COUNT

#### Returns

`Promise`\<`number` \| `false`\>

近似行数或 false；估算可能偏差很大，不能用于判断有无下一批

***

### union()

> **union**(`f`, `type?`): `this`

Defined in: [sys/mod.ts:1241](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1241)

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

Defined in: [sys/mod.ts:1271](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1271)

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

Defined in: [sys/mod.ts:2045](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2045)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:2034](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L2034)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:1022](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1022)

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

Defined in: [sys/mod.ts:1928](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1928)

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

Defined in: [sys/mod.ts:200](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L200)

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

Defined in: [sys/mod.ts:649](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L649)

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

Defined in: [sys/mod.ts:631](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L631)

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

Defined in: [sys/mod.ts:229](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L229)

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

Defined in: [sys/mod.ts:289](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L289)

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

Defined in: [sys/mod.ts:218](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L218)

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

通过 where 条件筛选单条数据

#### Param

**db**

数据库对象

#### Param

**s**

筛选条件数组或字符串

#### Param

**opt**

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名；lock 需确保 where 条件命中索引，否则可能退化为表锁）

#### Call Signature

> `static` **one**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:678](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L678)

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

###### array

`true`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> `static` **one**\<`T`\>(`db`, `s`, `opt?`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:692](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L692)

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt?

###### array?

`false`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### oneArray()

> `static` **oneArray**(`db`, `s`, `opt?`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:773](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L773)

通过 where 条件筛选单条数据返回原生对象

#### Parameters

##### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

数据库对象

##### s

`any`

筛选条件数组或字符串

##### opt?

选项（opt.pre: MySQL 表前缀/PostgreSQL Schema 名）

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### hint?

`string`

###### index?

`string` \| `string`[]

###### lock?

`boolean`

###### pre?

`string`

###### select?

`string` \| `string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

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

Defined in: [sys/mod.ts:315](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L315)

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

Defined in: [sys/mod.ts:359](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L359)

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

> `static` **select**\<`T`\>(`db`, `c`, `opt?`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:568](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L568)

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

`T` & `Record`\<`string`, `any`\>

***

### toArrayByRecord()

> `static` **toArrayByRecord**\<`T`\>(`obj`): `Record`\<`string`, `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:822](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L822)

将 key val 组成的数据列表转换为原生对象模式，获取的是新创建的数组

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### obj

`Record`\<`string`, `T`\>

要转换的 kv 数据列表

#### Returns

`Record`\<`string`, `Record`\<`string`, `any`\>\>

***

### updateByWhere()

> `static` **updateByWhere**(`db`, `data`, `where`, `opt?`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:392](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L392)

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

Defined in: [sys/mod.ts:438](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L438)

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

Defined in: [sys/mod.ts:476](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L476)

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

Defined in: [sys/mod.ts:209](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L209)

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

> `static` **where**\<`T`\>(`db`, `s?`, `opt?`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:600](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L600)

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

`T` & `Record`\<`string`, `any`\>
