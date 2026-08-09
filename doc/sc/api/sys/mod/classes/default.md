[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / default

# Class: default

Defined in: [sys/mod.ts:66](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L66)

开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`;

## Constructors

### Constructor

> **new default**(`opt`): `Mod`

Defined in: [sys/mod.ts:120](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L120)

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

Defined in: [sys/mod.ts:96](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L96)

必须追加的数据筛选 key 与 values，仅单表模式有效

***

### \_ctr?

> `protected` `optional` **\_ctr?**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

Defined in: [sys/mod.ts:111](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L111)

ctr 对象

***

### \_data

> `protected` **\_data**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/mod.ts:90](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L90)

模型获取的属性

***

### \_db

> `protected` **\_db**: [`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

Defined in: [sys/mod.ts:105](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L105)

数据库连接对象

***

### \_fieldPrefix

> `protected` **\_fieldPrefix**: `string` = `''`

Defined in: [sys/mod.ts:114](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L114)

主表筛选前缀，优先 alias，其次表名

***

### \_index

> `protected` **\_index**: `string`[] \| `null` = `null`

Defined in: [sys/mod.ts:93](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L93)

当前选择的分表 _ 后缀，多个代表联查

***

### \_jsonUpdates

> `protected` **\_jsonUpdates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:87](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L87)

要在数据库边界序列化的 JSON 字段

***

### \_sql

> `protected` **\_sql**: [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:108](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L108)

Sql 对象

***

### \_total

> `protected` **\_total**: `number`[] = `[]`

Defined in: [sys/mod.ts:102](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L102)

已算出的 total

***

### \_updates

> `protected` **\_updates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:84](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L84)

要 update 的内容

***

### \_$index

> `protected` `static` **\_$index**: `string` = `''`

Defined in: [sys/mod.ts:78](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L78)

若使用 _$key 并且有多个 unique 索引，这里指定 _$key 的索引名

***

### \_$key

> `protected` `static` **\_$key**: `string` = `''`

Defined in: [sys/mod.ts:75](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L75)

设置后将由 _keyGenerator 函数生成唯一字段

***

### \_$pre?

> `protected` `static` `optional` **\_$pre?**: `string`

Defined in: [sys/mod.ts:81](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L81)

前缀，MySQL 时为表前缀（如 prefix_），PostgreSQL 时为 Schema 名。顺序：选项前缀 -> 本前缀 -> 配置文件前缀

***

### \_$primary

> `protected` `static` **\_$primary**: `string` = `'id'`

Defined in: [sys/mod.ts:72](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L72)

主键字段名

***

### \_$table

> `protected` `static` **\_$table**: `string` = `''`

Defined in: [sys/mod.ts:69](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L69)

表名

## Methods

### \_keyGenerator()

> `protected` **\_keyGenerator**(): `string`

Defined in: [sys/mod.ts:1888](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1888)

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

Defined in: [sys/mod.ts:1202](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1202)

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

Defined in: [sys/mod.ts:1203](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1203)

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

Defined in: [sys/mod.ts:1381](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1381)

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

Defined in: [sys/mod.ts:1382](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1382)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

***

### append()

> **append**(`sql`): `this`

Defined in: [sys/mod.ts:1797](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1797)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [sys/mod.ts:1753](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1753)

ORDER BY

#### Parameters

##### c

`string` \| (`string` \| `string`[])[]

字段字符串或数组

##### d?

`"DESC"` \| `"ASC"`

排序规则

#### Returns

`this`

***

### contain()

> **contain**(`contain`): `this`

Defined in: [sys/mod.ts:1806](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1806)

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

Defined in: [sys/mod.ts:1589](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1589)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1610](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1610)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:881](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L881)

创建数据

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-报错,null-唯一键非 _$key 键冲突

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1685](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1685)

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

Defined in: [sys/mod.ts:1507](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1507)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1508](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1508)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1731](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1731)

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

Defined in: [sys/mod.ts:1091](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1091)

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1095](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1095)

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

Defined in: [sys/mod.ts:1135](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1135)

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

Defined in: [sys/mod.ts:1833](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1833)

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

Defined in: [sys/mod.ts:1673](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1673)

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

Defined in: [sys/mod.ts:873](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L873)

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

Defined in: [sys/mod.ts:1824](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1824)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:1817](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1817)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1762](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1762)

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

Defined in: [sys/mod.ts:1722](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1722)

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

Defined in: [sys/mod.ts:1713](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1713)

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

Defined in: [sys/mod.ts:1661](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1661)

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

Defined in: [sys/mod.ts:1625](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1625)

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

Defined in: [sys/mod.ts:1868](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1868)

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

Defined in: [sys/mod.ts:1637](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1637)

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

Defined in: [sys/mod.ts:1775](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1775)

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

Defined in: [sys/mod.ts:1786](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1786)

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

Defined in: [sys/mod.ts:1003](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1003)

刷新当前模型获取最新数据

#### Parameters

##### lock?

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:1069](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1069)

移除本条目

#### Returns

`Promise`\<`boolean`\>

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index?`, `pre?`): `this`

Defined in: [sys/mod.ts:1649](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1649)

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

Defined in: [sys/mod.ts:1035](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1035)

更新 set 的数据到数据库，有未保存数据时才保存

#### Parameters

##### where?

`any`

自定义筛选条件，默认根据主键筛选

#### Returns

`Promise`\<`boolean`\>

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

Defined in: [sys/mod.ts:838](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L838)

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

Defined in: [sys/mod.ts:839](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L839)

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

Defined in: [sys/mod.ts:1840](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1840)

获取值对象，获取的是新创建的数组

#### Type Parameters

##### TC

`TC` *extends* (...`args`) => `any`

#### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

***

### total()

> **total**(`f?`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1565](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1565)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f?

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### union()

> **union**(`f`, `type?`): `this`

Defined in: [sys/mod.ts:1146](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1146)

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

Defined in: [sys/mod.ts:1176](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1176)

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

Defined in: [sys/mod.ts:1859](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1859)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:1848](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1848)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:972](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L972)

插入数据，如果存在则更新（UPSERT）

#### Parameters

##### conflict

`string` \| `string`[]

冲突字段，不能为 _$key 或 _$primary，应该是你要判断的唯一索引字段

#### Returns

`Promise`\<`boolean`\>

***

### where()

> **where**(`s`): `this`

Defined in: [sys/mod.ts:1742](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1742)

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

Defined in: [sys/mod.ts:185](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L185)

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

Defined in: [sys/mod.ts:634](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L634)

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

Defined in: [sys/mod.ts:616](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L616)

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

Defined in: [sys/mod.ts:214](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L214)

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

Defined in: [sys/mod.ts:274](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L274)

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

Defined in: [sys/mod.ts:203](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L203)

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

Defined in: [sys/mod.ts:663](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L663)

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

Defined in: [sys/mod.ts:677](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L677)

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

Defined in: [sys/mod.ts:758](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L758)

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

Defined in: [sys/mod.ts:780](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L780)

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

Defined in: [sys/mod.ts:300](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L300)

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

Defined in: [sys/mod.ts:344](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L344)

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

Defined in: [sys/mod.ts:553](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L553)

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

Defined in: [sys/mod.ts:807](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L807)

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

Defined in: [sys/mod.ts:377](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L377)

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

Defined in: [sys/mod.ts:423](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L423)

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

Defined in: [sys/mod.ts:461](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L461)

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

Defined in: [sys/mod.ts:194](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L194)

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

Defined in: [sys/mod.ts:585](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L585)

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
