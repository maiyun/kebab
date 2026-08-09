[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/db/conn](../index.md) / Connection

# Class: Connection

Defined in: [lib/db/conn.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L38)

数据库连接对象

## Constructors

### Constructor

> **new Connection**(`etc`, `link`): `Connection`

Defined in: [lib/db/conn.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L63)

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

Defined in: [lib/db/conn.ts:325](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L325)

#### Returns

`Promise`\<`boolean`\>

***

### commit()

> **commit**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:346](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L346)

#### Returns

`Promise`\<`boolean`\>

***

### end()

> **end**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:314](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L314)

关闭连接，一般情况下不使用

#### Returns

`Promise`\<`boolean`\>

***

### execute()

> **execute**(`sql`, `values?`): `Promise`\<[`IPacket`](../../interfaces/IPacket.md)\>

Defined in: [lib/db/conn.ts:240](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L240)

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

Defined in: [lib/db/conn.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L72)

获取连接 etc 信息

#### Returns

[`IConfigDb`](../../../../index/interfaces/IConfigDb.md)

***

### getLast()

> **getLast**(): `number`

Defined in: [lib/db/conn.ts:84](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L84)

获取最后一次获取连接的时间

#### Returns

`number`

***

### getLastSql()

> **getLastSql**(): `object`[]

Defined in: [lib/db/conn.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L91)

获取最后两次执行的 sql 字符串

#### Returns

`object`[]

***

### getService()

> **getService**(): [`ESERVICE`](../../enumerations/ESERVICE.md)

Defined in: [lib/db/conn.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L77)

获取数据库服务类型

#### Returns

[`ESERVICE`](../../enumerations/ESERVICE.md)

***

### isAvailable()

> **isAvailable**(`last?`): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:158](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L158)

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

Defined in: [lib/db/conn.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L108)

是否已经丢失

#### Returns

`boolean`

***

### isTransaction()

> **isTransaction**(): `boolean`

Defined in: [lib/db/conn.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L115)

是否是开启事务状态

#### Returns

`boolean`

***

### isUsing()

> **isUsing**(): `boolean`

Defined in: [lib/db/conn.ts:122](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L122)

获取当前状态是否正在被使用中

#### Returns

`boolean`

***

### query()

> **query**(`sql`, `values?`): `Promise`\<[`IData`](../../interfaces/IData.md)\>

Defined in: [lib/db/conn.ts:181](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L181)

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

Defined in: [lib/db/conn.ts:150](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L150)

设定最后使用时间

#### Returns

`void`

***

### rollback()

> **rollback**(): `Promise`\<`boolean`\>

Defined in: [lib/db/conn.ts:364](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L364)

#### Returns

`Promise`\<`boolean`\>

***

### setLost()

> **setLost**(): `void`

Defined in: [lib/db/conn.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L101)

将本条连接设置为不可用

#### Returns

`void`

***

### used()

> **used**(): `void`

Defined in: [lib/db/conn.ts:143](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L143)

取消占用

#### Returns

`void`

***

### using()

> **using**(): `boolean`

Defined in: [lib/db/conn.ts:129](https://github.com/maiyunnet/kebab/blob/master/lib/db/conn.ts#L129)

判断是否可用（丢失的也算不可用），返回 true 代表获取成功并自动刷新最后时间

#### Returns

`boolean`
