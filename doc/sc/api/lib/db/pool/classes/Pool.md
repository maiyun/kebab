[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/pool](../index.md) / Pool

# Class: Pool

Defined in: [lib/db/pool.ts:127](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L127)

数据库连接池对象

## Constructors

### Constructor

> **new Pool**(`etc`, `opt`): `Pool`

Defined in: [lib/db/pool.ts:141](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L141)

#### Parameters

##### etc

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

##### opt

###### read?

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)[]

可选只读从库连接列表

###### service

[`ESERVICE`](../../enumerations/ESERVICE.md)

服务商

#### Returns

`Pool`

## Methods

### beginTransaction()

> **beginTransaction**(`ctr`): `Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

Defined in: [lib/db/pool.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L231)

开启事务，返回事务对象并锁定连接，别人任何人不可用，有 ctr 的话必传 this，独立执行时可传 null

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) \| `null`

#### Returns

`Promise`\<[`Transaction`](../../tran/classes/Transaction.md) \| `null`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/pool.ts:211](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L211)

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

### getName()

> **getName**(): `string`

Defined in: [lib/db/pool.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L158)

获取当前连接的数据库名称

#### Returns

`string`

***

### getQueries()

> **getQueries**(): `number`

Defined in: [lib/db/pool.ts:387](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L387)

获取 SQL 执行次数

#### Returns

`number`

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/pool.ts:153](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L153)

获取当前连接的服务商

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### query()

#### Call Signature

> **query**(`sql`, `values?`, `opt?`): `Promise`\<[`IData`](../../interfaces/IData.md)\<`Record`\<`string`, `any`\>\>\>

Defined in: [lib/db/pool.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L169)

执行一条 SQL，无视顺序和相同连接，随用随取

##### Parameters

###### sql

`string`

执行的 SQL 字符串

###### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

SQL 占位符绑定的值

###### opt?

[`IQueryOptions`](../../interfaces/IQueryOptions.md)

查询选项，read 为 true 且已配置从库时路由到只读从库

##### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\<`Record`\<`string`, `any`\>\>\>

查询结果，result = -500 表示系统错误

#### Call Signature

> **query**\<`TRow`\>(`sql`, `values?`, `opt?`): `Promise`\<[`IData`](../../interfaces/IData.md)\<`TRow`\>\>

Defined in: [lib/db/pool.ts:178](https://github.com/maiyunnet/kebab/blob/master/lib/db/pool.ts#L178)

执行一条 SQL，按指定类型返回数据行

##### Type Parameters

###### TRow

`TRow` *extends* `object`

SQL 返回的行结构，由调用方根据查询字段指定

##### Parameters

###### sql

`string`

执行的 SQL 字符串

###### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

SQL 占位符绑定的值

###### opt?

[`IQueryOptions`](../../interfaces/IQueryOptions.md)

查询选项，read 为 true 且已配置从库时路由到只读从库

##### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\<`TRow`\>\>

查询结果，result = -500 表示系统错误
