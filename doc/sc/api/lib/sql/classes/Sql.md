[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L43)

## Constructors

### Constructor

> **new Sql**(`opt`): `Sql`

Defined in: [lib/sql.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L73)

#### Parameters

##### opt

###### alias?

`string`[]

###### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

###### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

###### pre?

`string`

表前缀/Schema 名：MySQL 中作为表前缀（如 prefix_），PostgreSQL 中作为 Schema 名

###### service

[`ESERVICE`](../enumerations/ESERVICE.md)

###### sql?

`string`[]

#### Returns

`Sql`

## Methods

### append()

> **append**(`sql`): `this`

Defined in: [lib/sql.ts:1057](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1057)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [lib/sql.ts:809](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L809)

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

### copy()

> **copy**(`f?`, `opt?`): `Sql`

Defined in: [lib/sql.ts:877](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L877)

创建一个本对象的一个新的 sql 对象拷贝

#### Parameters

##### f?

`string` \| `string`[]

可为空，可设置新对象的 table 名变化

##### opt?

###### where?

`any`

#### Returns

`Sql`

***

### crossJoin()

> **crossJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:528](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L528)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### delete()

> **delete**(`f`): `this`

Defined in: [lib/sql.ts:416](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L416)

'xx'

#### Parameters

##### f

`string`

表名

#### Returns

`this`

***

### field()

> **field**(`str`, `pre?`, `suf?`): `string`

Defined in: [lib/sql.ts:1068](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1068)

对字段进行包裹

#### Parameters

##### str

`string` \| `number` \| \[`string`, `string`[]\]

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅请在 field 表名时倒入前缀/Schema

##### suf?

`string` = `''`

表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS，可能是分表查询时用

#### Returns

`string`

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [lib/sql.ts:1047](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1047)

获取带 data 的 sql 语句

#### Parameters

##### sql?

`string`

##### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

#### Returns

`string`

***

### fullJoin()

> **fullJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:517](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L517)

full join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### getData()

> **getData**(): [`DbValue`](../../../index/type-aliases/DbValue.md)[]

Defined in: [lib/sql.ts:1031](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1031)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:1038](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1038)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:1011](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1011)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:833](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L833)

GROUP BY

#### Parameters

##### c

`string` \| `string`[]

字段字符串或数组

#### Returns

`this`

***

### having()

> **having**(`s?`): `this`

Defined in: [lib/sql.ts:535](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L535)

having 后置筛选器，用法类似 where

#### Parameters

##### s?

`any` = `''`

#### Returns

`this`

***

### hint()

> **hint**(`h`): `this`

Defined in: [lib/sql.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L119)

设置 MySQL 优化器 Hint
会以 Optimizer Hint 注释语法注入到 SELECT 关键字后
传入 hint 内容即可，无需包裹注释符号

#### Parameters

##### h

`string`

Hint 内容

#### Returns

`this`

#### Example

```ts
// --- 强制走指定索引（最常用）
INDEX(`supply_date_0_0` `idx_supply_date_query`)

// --- 指定某表不用某索引
NO_INDEX(`supply_date_0_0` `idx_old`)

// --- 指定 JOIN 顺序和索引
JOIN_ORDER(`a` `b`) INDEX(`a` `idx_a`) INDEX(`b` `idx_b`)

// --- 指定 JOIN 中某表使用的索引
JOIN_INDEX(`supply_date_0_0` `idx_supply_date_query`)

// --- 多表多索引组合
INDEX(`t1` `idx_a`) JOIN_INDEX(`t2` `idx_b`)

// --- 官方文档: https://dev.mysql.com/doc/refman/8.0/en/optimizer-hints.html
```

***

### innerJoin()

> **innerJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:506](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L506)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### insert()

> **insert**(`table`, `ignore?`): `this`

Defined in: [lib/sql.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L131)

插入数据前导

#### Parameters

##### table

`string`

表名

##### ignore?

`boolean` = `false`

是否忽略错误（MySQL: INSERT IGNORE, PGSQL: ON CONFLICT DO NOTHING）

#### Returns

`this`

***

### join()

> **join**(`f`, `s?`, `type?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:458](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L458)

join 方法

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

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### leftJoin()

> **leftJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:484](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L484)

left join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b?`): `this`

Defined in: [lib/sql.ts:853](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L853)

LIMIT（limit、offset, limit）

#### Parameters

##### a

`number`

起始（offset）

##### b?

`number` = `0`

长度（limit）

#### Returns

`this`

***

### lock()

> **lock**(): `this`

Defined in: [lib/sql.ts:868](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L868)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### rightJoin()

> **rightJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:495](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L495)

right join 方法

#### Parameters

##### f

`string`

表名

##### s?

`any` = `[]`

ON 信息

##### suf?

`string` = `''`

表后缀

##### pre?

`string` = `''`

MySQL 时为表前缀，PostgreSQL 时为 Schema 名，仅在 join 非默认前缀时填写

#### Returns

`this`

***

### select()

> **select**(`c`, `f`): `this`

Defined in: [lib/sql.ts:303](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L303)

'*', 'xx'

#### Parameters

##### c

`string` \| (`string` \| `any`[])[]

字段字符串或字段数组

##### f

`string` \| `string`[]

表，允许多张表

#### Returns

`this`

***

### union()

> **union**(`lsql`, `type?`): `this`

Defined in: [lib/sql.ts:428](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L428)

联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

##### type?

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`lsql`): `this`

Defined in: [lib/sql.ts:446](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L446)

所有联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

#### Returns

`this`

***

### update()

> **update**(`f`, `s`): `this`

Defined in: [lib/sql.ts:344](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L344)

UPDATE SQL 方法

#### Parameters

##### f

`string`

表名

##### s

`any`

设定 update 的值

#### Returns

`this`

***

### updateByValues()

> **updateByValues**(`table`, `key`, `cols`, `rows`): `this`

Defined in: [lib/sql.ts:247](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L247)

批量 UPDATE，以子查询作为数据源，纯更新语义（不会插入新行）
MySQL: UPDATE t INNER JOIN (SELECT col AS alias ... UNION ALL SELECT ...) AS tmp ON t.key=tmp.key SET t.c=tmp.c
PostgreSQL: UPDATE t SET c=tmp.c FROM (VALUES (typed nulls), ($1,...)) AS tmp(cols) WHERE t.key=tmp.key

#### Parameters

##### table

`string`

表名

##### key

`string`

用于定位待更新记录的字段名，通常为主键或唯一键，至少必须建立索引；
        该参数是字段名而不是索引名，仅参与 ON / WHERE 匹配，不会被更新

##### cols

`string`[]

要更新的列名数组（不含 key）

##### rows

`any`[][]

数据行数组，每行顺序为 [keyVal, col1Val, col2Val, ...]（与 [key, ...cols] 对应）

#### Returns

`this`

***

### upsert()

> **upsert**(`data`, `conflict?`): `this`

Defined in: [lib/sql.ts:208](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L208)

如果存在则更新不存在则插入（UPSERT）

#### Parameters

##### data

`any`

更新的数据

##### conflict?

`string` \| `string`[]

冲突字段，PostgreSQL 用于指定 ON CONFLICT 字段；MySQL 时忽略，因为会对所有唯一键冲突执行更新

#### Returns

`this`

***

### values()

> **values**(`cs`, `vs?`): `this`

Defined in: [lib/sql.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L150)

实际插入数据的数据

#### Parameters

##### cs

`string`[] \| `Record`\<`string`, [`DbValue`](../../../index/type-aliases/DbValue.md)\>

[] 数据列或字段列

##### vs?

[`DbValue`](../../../index/type-aliases/DbValue.md)[] \| [`DbValue`](../../../index/type-aliases/DbValue.md)[][]

[] | [][] 数据

#### Returns

`this`

***

### where()

> **where**(`s`): `this`

Defined in: [lib/sql.ts:568](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L568)

筛选器
标量相等：'city': 'bj', 'type': '2'
运算符条件：['type', '>', '1']
集合条件：['type', 'in', ['1', '2']] 或 'type': ['1', '2']
逻辑分组：'$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]]
字段比较：'city_in': column('city_out')
原始条件：['JSON_CONTAINS(`uid`, ?)', ['hello']]
JSON 条件：['info', 'json', {'a': 1}]

#### Parameters

##### s

`any`

筛选数据

#### Returns

`this`
