[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/tran](../index.md) / Transaction

# Class: Transaction

Defined in: [lib/db/tran.ts:9](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L9)

事务连接对象，commit 和 rollback 后将无法使用

## Constructors

### Constructor

> **new Transaction**(`ctr`, `conn`, `opts`): `Transaction`

Defined in: [lib/db/tran.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L28)

#### Parameters

##### ctr

[`Ctr`](../../../../sys/ctr/classes/Ctr.md) | `null`

##### conn

[`Connection`](../../conn/classes/Connection.md)

##### opts

###### danger?

`number`

###### warning?

`number`

#### Returns

`Transaction`

## Methods

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L104)

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/tran.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L85)

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

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/tran.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L61)

在事务连接中执行一条 SQL

#### Parameters

##### sql

`string`

执行的 SQL 字符串

##### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

要替换的 data 数据

#### Returns

`Promise`\<[`IData`](../../interfaces/IData.md)\>

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/tran.ts:126](https://github.com/maiyunnet/kebab/blob/master/lib/db/tran.ts#L126)

#### Returns

`Promise`\<`boolean`\>
