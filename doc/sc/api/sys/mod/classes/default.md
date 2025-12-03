[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / default

# Class: default

Defined in: [sys/mod.ts:65](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L65)

开启软更需要在表添加字段：ALTER TABLE `table_name` ADD `time_remove` bigint NOT NULL DEFAULT '0' AFTER `xxx`;

## Constructors

### Constructor

> **new default**(`opt`): `Mod`

Defined in: [sys/mod.ts:113](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L113)

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

###### index?

`string` \| `string`[]

框架会自动去重

###### pre?

`string`

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

Defined in: [sys/mod.ts:92](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L92)

必须追加的数据筛选 key 与 values，仅单表模式有效

***

### \_ctr?

> `protected` `optional` **\_ctr**: [`Ctr`](../../ctr/classes/Ctr.md) = `undefined`

Defined in: [sys/mod.ts:107](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L107)

ctr 对象

***

### \_data

> `protected` **\_data**: `Record`\<`string`, `any`\> = `{}`

Defined in: [sys/mod.ts:86](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L86)

模型获取的属性

***

### \_db

> `protected` **\_db**: [`Transaction`](../../../lib/db/tran/classes/Transaction.md) \| [`Pool`](../../../lib/db/pool/classes/Pool.md)

Defined in: [sys/mod.ts:101](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L101)

数据库连接对象

***

### \_index

> `protected` **\_index**: `string`[] \| `null` = `null`

Defined in: [sys/mod.ts:89](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L89)

当前选择的分表 _ 后缀，多个代表联查

***

### \_sql

> `protected` **\_sql**: [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:104](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L104)

Sql 对象

***

### \_total

> `protected` **\_total**: `number`[] = `[]`

Defined in: [sys/mod.ts:98](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L98)

已算出的 total

***

### \_updates

> `protected` **\_updates**: `Record`\<`string`, `boolean`\> = `{}`

Defined in: [sys/mod.ts:83](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L83)

要 update 的内容

***

### \_$index

> `protected` `static` **\_$index**: `string` = `''`

Defined in: [sys/mod.ts:77](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L77)

若使用 _$key 并且有多个 unique 索引，这里指定 _$key 的索引名

***

### \_$key

> `protected` `static` **\_$key**: `string` = `''`

Defined in: [sys/mod.ts:74](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L74)

设置后将由 _keyGenerator 函数生成唯一字段

***

### \_$pre?

> `protected` `static` `optional` **\_$pre**: `string`

Defined in: [sys/mod.ts:80](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L80)

前缀，顺序：选项前缀 -> 本前缀 -> 配置文件前缀

***

### \_$primary

> `protected` `static` **\_$primary**: `string` = `'id'`

Defined in: [sys/mod.ts:71](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L71)

主键字段名

***

### \_$table

> `protected` `static` **\_$table**: `string` = `''`

Defined in: [sys/mod.ts:68](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L68)

表名

## Methods

### \_keyGenerator()

> `protected` **\_keyGenerator**(): `string`

Defined in: [sys/mod.ts:1750](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1750)

当 _key 不为空时，则依据继承此方法的方法自动生成填充 key

#### Returns

`string`

***

### all()

获取列表

#### Param

是否以某个字段为主键

#### Call Signature

> **all**(): `Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

Defined in: [sys/mod.ts:1117](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1117)

##### Returns

`Promise`\<`false` \| [`Rows`](Rows.md)\<`Mod`\>\>

#### Call Signature

> **all**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

Defined in: [sys/mod.ts:1118](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1118)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Mod`\>\>

***

### allArray()

获取列表（得到的为原生对象或数组，不是模型）

#### Param

是否以某个字段为主键

#### Call Signature

> **allArray**(): `Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

Defined in: [sys/mod.ts:1292](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1292)

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>[]\>

#### Call Signature

> **allArray**(`key`): `Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

Defined in: [sys/mod.ts:1293](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1293)

##### Parameters

###### key

`string`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `Record`\<`string`, `any`\>\>\>

***

### append()

> **append**(`sql`): `this`

Defined in: [sys/mod.ts:1659](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1659)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d`): `this`

Defined in: [sys/mod.ts:1615](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1615)

ORDER BY

#### Parameters

##### c

字段字符串或数组

`string` | (`string` \| `string`[])[]

##### d

排序规则

`"DESC"` | `"ASC"`

#### Returns

`this`

***

### contain()

> **contain**(`contain`): `this`

Defined in: [sys/mod.ts:1668](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1668)

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

Defined in: [sys/mod.ts:1481](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1481)

根据当前条件，筛选出当前条目该有的数据条数

#### Returns

`Promise`\<`number`\>

***

### countSql()

> **countSql**(): `string`

Defined in: [sys/mod.ts:1501](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1501)

获取当前条件下的 count 的 SQL 语句

#### Returns

`string`

***

### create()

> **create**(): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:817](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L817)

创建数据

#### Returns

`Promise`\<`boolean` \| `null`\>

true-成功,false-报错,null-唯一键非 _$key 键冲突

***

### crossJoin()

> **crossJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1575](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1575)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### explain()

获取数查询（SELECT）扫描情况，获取字符串或对象

#### Param

是否获取完全的情况，默认不获取，只返回扫描情况

#### Call Signature

> **explain**(`all?`): `Promise`\<`string` \| `false`\>

Defined in: [sys/mod.ts:1414](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1414)

##### Parameters

###### all?

`false`

##### Returns

`Promise`\<`string` \| `false`\>

#### Call Signature

> **explain**(`all`): `Promise`\<`false` \| `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:1415](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1415)

##### Parameters

###### all

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\>\>

***

### filter()

> **filter**(`s`): `this`

Defined in: [sys/mod.ts:1593](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1593)

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

是否加锁

#### Param

是否返回原生对象

#### Call Signature

> **first**(`lock`, `array`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1006](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1006)

##### Parameters

###### lock

`boolean`

###### array

`true`

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> **first**(`lock?`, `array?`): `Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1010](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1010)

##### Parameters

###### lock?

`boolean`

###### array?

`false`

##### Returns

`Promise`\<`false` \| `Mod` & `Record`\<`string`, `any`\> \| `null`\>

***

### firstArray()

> **firstArray**(`lock`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:1050](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1050)

获取数据库第一个原生对象

#### Parameters

##### lock

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [sys/mod.ts:1695](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1695)

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

> **fullJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1563](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1563)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### get()

> **get**(`n`): `any`

Defined in: [sys/mod.ts:809](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L809)

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

Defined in: [sys/mod.ts:1686](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1686)

获取全部 data

#### Returns

`any`[]

***

### getSql()

> **getSql**(): `string`

Defined in: [sys/mod.ts:1679](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1679)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [sys/mod.ts:1624](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1624)

GROUP BY

#### Parameters

##### c

字段字符串或数组

`string` | `string`[]

#### Returns

`this`

***

### having()

> **having**(`s`): `this`

Defined in: [sys/mod.ts:1584](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1584)

筛选器

#### Parameters

##### s

`any`

筛选条件数组或字符串

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1551](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1551)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### join()

> **join**(`f`, `s`, `type`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1515](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1515)

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### type

`string` = `'INNER'`

类型

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### langText()

> **langText**(`col`, `lang`): `string`

Defined in: [sys/mod.ts:1730](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1730)

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

> **leftJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1527](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1527)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b`): `this`

Defined in: [sys/mod.ts:1637](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1637)

LIMIT

#### Parameters

##### a

`number`

起始

##### b

`number` = `0`

长度

#### Returns

`this`

***

### page()

> **page**(`count`, `page`): `this`

Defined in: [sys/mod.ts:1648](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1648)

分页

#### Parameters

##### count

`number`

每页条数

##### page

`number` = `1`

当前页数

#### Returns

`this`

***

### refresh()

> **refresh**(`lock`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:931](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L931)

刷新当前模型获取最新数据

#### Parameters

##### lock

`boolean` = `false`

是否加锁

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:988](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L988)

移除本条目

#### Returns

`Promise`\<`boolean`\>

***

### rightJoin()

> **rightJoin**(`f`, `s`, `index`, `pre`): `this`

Defined in: [sys/mod.ts:1539](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1539)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

ON 信息

##### index

`string` = `''`

给本表增加 index 分表项

##### pre

`string` = `''`

前缀，仅与主表的 pre 不同时传入

#### Returns

`this`

***

### save()

> **save**(`where?`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:959](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L959)

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

字符串或键/值

#### Param

可能是数字

#### Call Signature

> **set**\<`T`, `TK`\>(`n`): `void`

Defined in: [sys/mod.ts:770](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L770)

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

Defined in: [sys/mod.ts:771](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L771)

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

Defined in: [sys/mod.ts:1702](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1702)

获取值对象，获取的是新创建的数组

#### Type Parameters

##### TC

`TC` *extends* (...`args`) => `any`

#### Returns

[`TOnlyProperties`](../type-aliases/TOnlyProperties.md)\<`InstanceType`\<`TC`\>\> & `Record`\<`string`, `any`\>

***

### total()

> **total**(`f`): `Promise`\<`number`\>

Defined in: [sys/mod.ts:1457](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1457)

获取总条数，自动抛弃 LIMIT，仅用于获取数据的情况（select）

#### Parameters

##### f

`string` = `'*'`

#### Returns

`Promise`\<`number`\>

***

### union()

> **union**(`f`, `type`): `this`

Defined in: [sys/mod.ts:1061](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1061)

联合查询表数据

#### Parameters

##### f

要联合查询的表列表、单个表、sql 对象

`string` | `string`[] | [`Sql`](../../../lib/sql/classes/Sql.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

##### type

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`f`): `this`

Defined in: [sys/mod.ts:1091](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1091)

所有联合查询表数据

#### Parameters

##### f

要联合查询的表列表、单个表、sql 对象

`string` | `string`[] | [`Sql`](../../../lib/sql/classes/Sql.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md) | [`IModUnionItem`](../interfaces/IModUnionItem.md)[]

#### Returns

`this`

***

### unsaved()

> **unsaved**(): `boolean`

Defined in: [sys/mod.ts:1721](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1721)

当前是否设置了未保存 --=

#### Returns

`boolean`

***

### updates()

> **updates**(): `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:1710](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1710)

获取当前设置要提交的数据

#### Returns

`Record`\<`string`, `any`\>

***

### upsert()

> **upsert**(`conflict`): `Promise`\<`boolean`\>

Defined in: [sys/mod.ts:901](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L901)

插入数据，如果存在则更新（UPSERT）

#### Parameters

##### conflict

冲突字段，不能为 _$key 或 _$primary，应该是你要判断的唯一索引字段

`string` | `string`[]

#### Returns

`Promise`\<`boolean`\>

***

### where()

> **where**(`s`): `this`

Defined in: [sys/mod.ts:1604](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L1604)

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

Defined in: [sys/mod.ts:168](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L168)

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

> `static` **find**\<`T`\>(`db`, `val`, `opt`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:597](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L597)

根据主键（或 key 字段）获取对象

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### val

主键值

`string` | `number` | `null`

##### opt

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

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

> `static` **getCreate**\<`T`\>(`db`, `opt`): `T`

Defined in: [sys/mod.ts:579](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L579)

获取创建对象，通常用于新建数据库条目

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### opt

选项

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

Defined in: [sys/mod.ts:183](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L183)

添加一个序列（允许超过 65536 的占位符会被拆分多次执行）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### cs

字段列表

`string`[] | `Record`\<`string`, `any`\>

##### vs?

数据列表

`any`[] | `any`[][]

##### opt?

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### insertSql()

> `static` **insertSql**(`db`, `cs`, `vs?`, `opt?`): `string`

Defined in: [sys/mod.ts:242](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L242)

获取添加一个序列的模拟 SQL

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### cs

字段列表

`string`[] | `Record`\<`string`, `any`\>

##### vs?

数据列表

`any`[] | `any`[][]

##### opt?

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`string`

***

### one()

通过 where 条件筛选单条数据

#### Param

数据库对象

#### Param

筛选条件数组或字符串

#### Param

选项

#### Call Signature

> `static` **one**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:624](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L624)

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

###### array

`true`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

#### Call Signature

> `static` **one**\<`T`\>(`db`, `s`, `opt`): `Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:636](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L636)

##### Type Parameters

###### T

`T` *extends* `Mod`

##### Parameters

###### db

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

###### s

`any`

###### opt

###### array?

`false`

###### by?

\[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

###### select?

`string` \| `string`[]

##### Returns

`Promise`\<`false` \| `T` & `Record`\<`string`, `any`\> \| `null`\>

***

### oneArray()

> `static` **oneArray**(`db`, `s`, `opt`): `Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

Defined in: [sys/mod.ts:711](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L711)

通过 where 条件筛选单条数据返回原生对象

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### s

`any`

筛选条件数组或字符串

##### opt

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string` \| `string`[]

###### pre?

`string`

###### select?

`string` \| `string`[]

#### Returns

`Promise`\<`false` \| `Record`\<`string`, `any`\> \| `null`\>

***

### primarys()

> `static` **primarys**(`db`, `where`, `opt`): `Promise`\<`false` \| `any`[]\>

Defined in: [sys/mod.ts:731](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L731)

根据 where 条件获取主键值列表

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any` = `''`

where 条件

##### opt

选项

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

> `static` **removeByWhere**(`db`, `where`, `opt`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:267](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L267)

根据条件移除条目

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **removeByWhereSql**(`db`, `where`, `opt`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:311](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L311)

根据条件移除条目（仅获取 SQL 对象）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **select**\<`T`\>(`db`, `c`, `opt`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:520](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L520)

select 自定字段

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### c

字段字符串或字段数组

`string` | `string`[]

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

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T` & `Record`\<`string`, `any`\>

***

### toArrayByRecord()

> `static` **toArrayByRecord**\<`T`\>(`obj`): `Record`\<`string`, `Record`\<`string`, `any`\>\>

Defined in: [sys/mod.ts:758](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L758)

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

> `static` **updateByWhere**(`db`, `data`, `where`, `opt`): `Promise`\<`number` \| `false` \| `null`\>

Defined in: [sys/mod.ts:344](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L344)

根据条件更新数据

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **updateByWhereSql**(`db`, `data`, `where`, `opt`): [`Sql`](../../../lib/sql/classes/Sql.md)

Defined in: [sys/mod.ts:390](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L390)

根据条件更新数据（仅获取 SQL 对象）

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`any`

要更新的数据

##### where

`any`

筛选条件

##### opt

选项

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

> `static` **updateList**(`db`, `data`, `key`, `opt`): `Promise`\<`boolean` \| `null`\>

Defined in: [sys/mod.ts:424](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L424)

批量更新数据

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### data

`Record`\<`string`, `any`\>[]

数据列表

##### key

`string`

用于定位的主键或唯一键字段名

##### opt

选项

###### ctr?

[`Ctr`](../../ctr/classes/Ctr.md)

###### index?

`string`

###### pre?

`string`

#### Returns

`Promise`\<`boolean` \| `null`\>

***

### where()

> `static` **where**\<`T`\>(`db`, `s`, `opt`): `T` & `Record`\<`string`, `any`\>

Defined in: [sys/mod.ts:550](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L550)

通过 where 条件获取模型

#### Type Parameters

##### T

`T` *extends* `Mod`

#### Parameters

##### db

数据库对象

[`Transaction`](../../../lib/db/tran/classes/Transaction.md) | [`Pool`](../../../lib/db/pool/classes/Pool.md)

##### s

`any` = `''`

筛选条件数组或字符串

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

###### index?

`string` \| `string`[]

###### pre?

`string`

#### Returns

`T` & `Record`\<`string`, `any`\>
