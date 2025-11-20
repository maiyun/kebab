[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / Sql

# Class: Sql

Defined in: [lib/sql.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L23)

## Constructors

### Constructor

> **new Sql**(`pre?`, `opt?`): `Sql`

Defined in: [lib/sql.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L44)

#### Parameters

##### pre?

`string`

##### opt?

###### data?

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

###### service?

[`ESERVICE`](../enumerations/ESERVICE.md)

###### sql?

`string`[]

#### Returns

`Sql`

## Methods

### append()

> **append**(`sql`): `this`

Defined in: [lib/sql.ts:962](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L962)

在 sql 最后追加字符串

#### Parameters

##### sql

`string`

#### Returns

`this`

***

### by()

> **by**(`c`, `d`): `this`

Defined in: [lib/sql.ts:766](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L766)

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

Defined in: [lib/sql.ts:834](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L834)

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

Defined in: [lib/sql.ts:581](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L581)

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

Defined in: [lib/sql.ts:476](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L476)

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

Defined in: [lib/sql.ts:978](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L978)

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

Defined in: [lib/sql.ts:952](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L952)

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

Defined in: [lib/sql.ts:570](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L570)

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

Defined in: [lib/sql.ts:936](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L936)

获取全部 data

#### Returns

[`DbValue`](../../../index/type-aliases/DbValue.md)[]

***

### getPre()

> **getPre**(): `string`

Defined in: [lib/sql.ts:943](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L943)

获取定义的 pre

#### Returns

`string`

***

### getSql()

> **getSql**(): `string`

Defined in: [lib/sql.ts:920](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L920)

获取 sql 语句

#### Returns

`string`

***

### group()

> **group**(`c`): `this`

Defined in: [lib/sql.ts:790](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L790)

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

Defined in: [lib/sql.ts:588](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L588)

having 后置筛选器，用法类似 where

#### Parameters

##### s

`any` = `''`

#### Returns

`this`

***

### innerJoin()

> **innerJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:559](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L559)

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

> **insert**(`table`): `this`

Defined in: [lib/sql.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L65)

插入数据前导

#### Parameters

##### table

`string`

表名

#### Returns

`this`

***

### join()

> **join**(`f`, `s`, `type`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:511](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L511)

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

Defined in: [lib/sql.ts:537](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L537)

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

Defined in: [lib/sql.ts:810](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L810)

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

Defined in: [lib/sql.ts:825](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L825)

追加消极锁，通常不建议使用

#### Returns

`this`

***

### placeholder()

> **placeholder**(): `string`

Defined in: [lib/sql.ts:968](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L968)

获取占位符

#### Returns

`string`

***

### rightJoin()

> **rightJoin**(`f`, `s`, `suf`, `pre`): `this`

Defined in: [lib/sql.ts:548](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L548)

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

Defined in: [lib/sql.ts:284](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L284)

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

Defined in: [lib/sql.ts:488](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L488)

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

Defined in: [lib/sql.ts:499](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L499)

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

Defined in: [lib/sql.ts:325](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L325)

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

### values()

> **values**(`cs`, `vs`): `this`

Defined in: [lib/sql.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L79)

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

Defined in: [lib/sql.ts:621](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L621)

筛选器
1. 'city': 'bj', 'type': '2'
2. ['type', '>', '1']
3. ['type', 'in', ['1', '2']]
4. 'type': ['1', '2']
5. '$or': [{'city': 'bj'}, {'city': 'sh'}, [['age', '>', '10']]], 'type': '2'
6. 'city_in': column('city_out')
7. ['JSON_CONTAINS(`uid`, ?)', ['hello']]

#### Parameters

##### s

`any`

筛选数据

#### Returns

`this`
