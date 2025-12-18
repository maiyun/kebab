[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L37)

## Constructors

### Constructor

> **new Sql**(`opt`): `Sql`

Defined in: [lib/sql.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L64)

#### Parameters

##### opt

###### ctr?

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

###### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

###### pre?

`string`

###### service

[`ESERVICE`](../enumerations/ESERVICE.md)

###### sql?

`string`[]

#### Returns

`Sql`

## Methods

### append()

> **append**(`sql`): `this`

Defined in: [lib/sql.ts:848](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L848)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d`): `this`

Defined in: [lib/sql.ts:649](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L649)

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

### copy()

> **copy**(`f?`, `opt?`): `Sql`

Defined in: [lib/sql.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L717)

创建一个本对象的一个新的 sql 对象拷贝

#### Parameters

##### f?

可为空，可设置新对象的 table 名变化

`string` | `string`[]

##### opt?

###### where?

`any`

#### Returns

`Sql`

***

### crossJoin()

> **crossJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:414](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L414)

cross join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### delete()

> **delete**(`f`): `this`

Defined in: [lib/sql.ts:309](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L309)

'xx'

#### Parameters

##### f

`string`

表名

#### Returns

`this`

***

### field()

> **field**(`str`, `pre`, `suf`): `string`

Defined in: [lib/sql.ts:859](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L859)

对字段进行包裹

#### Parameters

##### str

`string` | `number` | (`string` \| `string`[])[]

##### pre

`string` = `''`

表前缀，仅请在 field 表名时倒入前缀

##### suf

`string` = `''`

表后缀，仅请在 field 表名时倒入后缀，前面加 # 代表要强制 AS，可能是分表查询时用

#### Returns

`string`

***

### format()

> **format**(`sql?`, `data?`): `string`

Defined in: [lib/sql.ts:838](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L838)

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

> **fullJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:403](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L403)

full join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### getData()

> **getData**(): [`DbValue`](../../../index/type-aliases/DbValue.md)[]

Defined in: [lib/sql.ts:822](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L822)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:829](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L829)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:806](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L806)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L673)

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

Defined in: [lib/sql.ts:421](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L421)

having 后置筛选器，用法类似 where

#### Parameters

##### s

`any` = `''`

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:392](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L392)

inner join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### insert()

> **insert**(`table`, `ignore`): `this`

Defined in: [lib/sql.ts:89](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L89)

插入数据前导

#### Parameters

##### table

`string`

表名

##### ignore

`boolean` = `false`

是否忽略错误（MySQL: INSERT IGNORE, PGSQL: ON CONFLICT DO NOTHING）

#### Returns

`this`

***

### join()

> **join**(`f`, `s`, `type`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:344](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L344)

join 方法

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

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### leftJoin()

> **leftJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:370](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L370)

left join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### limit()

> **limit**(`a`, `b`): `this`

Defined in: [lib/sql.ts:693](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L693)

LIMIT（limit、offset, limit）

#### Parameters

##### a

`number`

起始（offset）

##### b

`number` = `0`

长度（limit）

#### Returns

`this`

***

### lock()

> **lock**(): `this`

Defined in: [lib/sql.ts:708](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L708)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### rightJoin()

> **rightJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:381](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L381)

right join 方法

#### Parameters

##### f

`string`

表名

##### s

`any` = `[]`

ON 信息

##### suf

`string` = `''`

表后缀

##### pre

`string` = `''`

表前缀，仅在 join 非默认表前缀时填写

#### Returns

`this`

***

### select()

> **select**(`c`, `f`): `this`

Defined in: [lib/sql.ts:200](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L200)

'*', 'xx'

#### Parameters

##### c

字段字符串或字段数组

`string` | (`string` \| `any`[])[]

##### f

表，允许多张表

`string` | `string`[]

#### Returns

`this`

***

### union()

> **union**(`lsql`, `type`): `this`

Defined in: [lib/sql.ts:321](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L321)

联查另一个 sql 对象

#### Parameters

##### lsql

`Sql`

sql 对象

##### type

`string` = `''`

类型

#### Returns

`this`

***

### unionAll()

> **unionAll**(`lsql`): `this`

Defined in: [lib/sql.ts:332](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L332)

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

Defined in: [lib/sql.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L241)

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

### upsert()

> **upsert**(`data`, `conflict?`): `this`

Defined in: [lib/sql.ts:166](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L166)

如果存在则更新不存在则插入（UPSERT）

#### Parameters

##### data

`any`

更新的数据

##### conflict?

冲突字段，PostgreSQL 用于指定 ON CONFLICT 字段；MySQL 时忽略，因为会对所有唯一键冲突执行更新

`string` | `string`[]

#### Returns

`this`

***

### values()

> **values**(`cs`, `vs`): `this`

Defined in: [lib/sql.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L108)

实际插入数据的数据

#### Parameters

##### cs

[] 数据列或字段列

`string`[] | `Record`\<`string`, [`DbValue`](../../../index/type-aliases/DbValue.md)\>

##### vs

[] | [][] 数据

[`DbValue`](../../../index/type-aliases/DbValue.md)[] | [`DbValue`](../../../index/type-aliases/DbValue.md)[][]

#### Returns

`this`

***

### where()

> **where**(`s`): `this`

Defined in: [lib/sql.ts:455](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L455)

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
