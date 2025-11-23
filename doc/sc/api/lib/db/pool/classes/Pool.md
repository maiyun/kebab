[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/pool](../index.md) / Pool

# Class: Pool

Defined in: [lib/db/pool.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L115)

数据库连接池对象

## Constructors

### Constructor

> **new Pool**(`etc`, `opt`): `Pool`

Defined in: [lib/db/pool.ts:126](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L126)

#### Parameters

##### etc

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

##### opt

###### service

[`ESERVICE`](../../enumerations/ESERVICE.md)

服务商

#### Returns

`Pool`

## Methods

### beginTransaction()

> **beginTransaction**(`ctr`): `Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

Defined in: [lib/db/pool.ts:189](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L189)

开启事务，返回事务对象并锁定连接，别人任何人不可用，有 ctr 的话必传 this，独立执行时可传 null

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) | `null`

#### Returns

`Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/pool.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L169)

执行一条 SQL 并获得影响行数对象 packet，连接失败抛出错误

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

***

### getQueries()

> **getQueries**(): `number`

Defined in: [lib/db/pool.ts:321](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L321)

获取 SQL 执行次数

#### Returns

`number`

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/pool.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L135)

获取当前连接的服务商

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/pool.ts:145](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L145)

执行一条 SQL，无视顺序和相同连接，随用随取

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\>

error.errno = -500 表示系统错误
