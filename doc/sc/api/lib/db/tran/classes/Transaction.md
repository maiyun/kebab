[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/tran](../index.md) / Transaction

# Class: Transaction

Defined in: [lib/db/tran.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L9)

事务连接对象，commit 和 rollback 后将无法使用

## Constructors

### Constructor

> **new Transaction**(`ctr`, `conn`, `opts?`): `Transaction`

Defined in: [lib/db/tran.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L28)

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) \| `null`

##### conn

[`Connection`](../../conn/classes/Connection.md)

##### opts?

###### danger?

`number`

###### warning?

`number`

#### Returns

`Transaction`

## Methods

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:114](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L114)

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/tran.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L95)

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

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md) \| `null`

Defined in: [lib/db/tran.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L52)

获取当前连接的服务商

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md) \| `null`

***

### query()

#### Call Signature

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\<`Record`\<`string`, `any`\>\>\>

Defined in: [lib/db/tran.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L62)

在事务连接中执行一条 SQL

##### Parameters

###### sql

`string`

执行的 SQL 字符串

###### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

SQL 占位符绑定的值

##### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\<`Record`\<`string`, `any`\>\>\>

查询结果，result = -500 表示事务已关闭或查询失败

#### Call Signature

> **query**\<`TRow`\>(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\<`TRow`\>\>

Defined in: [lib/db/tran.ts:70](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L70)

在事务连接中执行一条 SQL，按指定类型返回数据行

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

##### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\<`TRow`\>\>

查询结果，result = -500 表示事务已关闭或查询失败

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:136](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L136)

#### Returns

`Promise`\<`boolean`\>
