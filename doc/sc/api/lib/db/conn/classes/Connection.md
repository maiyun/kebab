[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/conn](../index.md) / Connection

# Class: Connection

Defined in: [lib/db/conn.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L39)

数据库连接对象

## Constructors

### Constructor

> **new Connection**(`etc`, `link`): `Connection`

Defined in: [lib/db/conn.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L64)

#### Parameters

##### etc

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

##### link

`Connection` \| `Client`

#### Returns

`Connection`

## Methods

### beginTransaction()

> **beginTransaction**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:326](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L326)

#### Returns

`Promise`\<`boolean`\>

***

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:352](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L352)

#### Returns

`Promise`\<`boolean`\>

***

### end()

> **end**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:315](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L315)

关闭连接，一般情况下不使用

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/conn.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L241)

执行一条 SQL 并获得影响行数对象 packet

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

### getEtc()

> **getEtc**(): [`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

Defined in: [lib/db/conn.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L73)

获取连接 etc 信息

#### Returns

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

***

### getLast()

> **getLast**(): `number`

Defined in: [lib/db/conn.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L85)

获取最后一次获取连接的时间

#### Returns

`number`

***

### getLastSql()

> **getLastSql**(): `object`[]

Defined in: [lib/db/conn.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L92)

获取最后两次执行的 sql 字符串

#### Returns

`object`[]

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/conn.ts:78](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L78)

获取数据库服务类型

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### isAvailable()

> **isAvailable**(`last?`): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:159](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L159)

通过执行一条语句判断当前连接是否可用

#### Parameters

##### last?

`boolean` = `true`

是否刷新最后使用时间（默认刷新）

#### Returns

`Promise`\<`boolean`\>

***

### isLost()

> **isLost**(): `boolean`

Defined in: [lib/db/conn.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L109)

是否已经丢失

#### Returns

`boolean`

***

### isTransaction()

> **isTransaction**(): `boolean`

Defined in: [lib/db/conn.ts:116](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L116)

是否是开启事务状态

#### Returns

`boolean`

***

### isUsing()

> **isUsing**(): `boolean`

Defined in: [lib/db/conn.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L123)

获取当前状态是否正在被使用中

#### Returns

`boolean`

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/conn.ts:182](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L182)

执行一条 SQL 并获得返回数据

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

### refreshLast()

> **refreshLast**(): `void`

Defined in: [lib/db/conn.ts:151](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L151)

设定最后使用时间

#### Returns

`void`

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:372](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L372)

#### Returns

`Promise`\<`boolean`\>

***

### setLost()

> **setLost**(): `void`

Defined in: [lib/db/conn.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L102)

将本条连接设置为不可用

#### Returns

`void`

***

### used()

> **used**(): `void`

Defined in: [lib/db/conn.ts:144](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L144)

取消占用

#### Returns

`void`

***

### using()

> **using**(): `boolean`

Defined in: [lib/db/conn.ts:130](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L130)

判断是否可用（丢失的也算不可用），返回 true 代表获取成功并自动刷新最后时间

#### Returns

`boolean`
