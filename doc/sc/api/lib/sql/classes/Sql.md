[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L42)

## Constructors

### Constructor

> **new Sql**(`opt`): `Sql`

Defined in: [lib/sql.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L69)

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

Defined in: [lib/sql.ts:1006](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1006)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d?`): `this`

Defined in: [lib/sql.ts:762](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L762)

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

Defined in: [lib/sql.ts:830](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L830)

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

Defined in: [lib/sql.ts:491](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L491)

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

Defined in: [lib/sql.ts:379](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L379)

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

Defined in: [lib/sql.ts:1017](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1017)

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

Defined in: [lib/sql.ts:996](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L996)

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

Defined in: [lib/sql.ts:480](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L480)

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

Defined in: [lib/sql.ts:980](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L980)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:987](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L987)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:964](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L964)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:786](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L786)

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

Defined in: [lib/sql.ts:498](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L498)

having 后置筛选器，用法类似 where

#### Parameters

##### s?

`any` = `''`

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:469](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L469)

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

Defined in: [lib/sql.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L99)

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

Defined in: [lib/sql.ts:421](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L421)

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

Defined in: [lib/sql.ts:447](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L447)

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

Defined in: [lib/sql.ts:806](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L806)

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

Defined in: [lib/sql.ts:821](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L821)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### rightJoin()

> **rightJoin**(`f`, `s?`, `suf?`, `pre?`): `this`

Defined in: [lib/sql.ts:458](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L458)

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

Defined in: [lib/sql.ts:270](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L270)

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

Defined in: [lib/sql.ts:391](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L391)

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

Defined in: [lib/sql.ts:409](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L409)

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

Defined in: [lib/sql.ts:311](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L311)

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

Defined in: [lib/sql.ts:215](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L215)

批量 UPDATE，以子查询作为数据源，纯更新语义（不会插入新行）
MySQL: UPDATE t INNER JOIN (SELECT col AS alias ... UNION ALL SELECT ...) AS tmp ON t.key=tmp.key SET t.c=tmp.c
PostgreSQL: UPDATE t SET c=tmp.c FROM (VALUES ($1,...)) AS tmp(cols) WHERE t.key=tmp.key

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

Defined in: [lib/sql.ts:176](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L176)

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

Defined in: [lib/sql.ts:118](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L118)

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

Defined in: [lib/sql.ts:532](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L532)

筛选器
1. 'city': 'bj', 'type': '2'
2. ['type', '>', '1']
3. ['type', 'in', ['1', '2']]
4. 'type': ['1', '2']
5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2'
6. 'city_in': column('city_out')
7. ['JSON_CONTAINS(`uid`, ?)', ['hello']]
8. ['info', 'json', {'a': 1}]

#### Parameters

##### s

`any`

筛选数据

#### Returns

`this`
