[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L106)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L111)

#### Parameters

##### request?

`IncomingMessage`

##### socket?

`Socket`

##### head?

`Buffer`\<`ArrayBufferLike`\>

##### options?

###### headers?

`OutgoingHttpHeaders`

###### timeout?

`number`

#### Returns

`Socket`

## Accessors

### ended

#### Get Signature

> **get** **ended**(): `boolean`

Defined in: [lib/ws.ts:420](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L420)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:425](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L425)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:432](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L432)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:415](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L415)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt?`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:134](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L134)

以客户端形式发起链接

#### Parameters

##### u

`string`

以 ws, wss 开头的地址

##### opt?

[`IConnectOptions`](../interfaces/IConnectOptions.md) = `{}`

参数

#### Returns

`Promise`\<`Socket` \| `null`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [lib/ws.ts:375](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L375)

#### Returns

`void`

***

### end()

> **end**(): `void`

Defined in: [lib/ws.ts:371](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L371)

#### Returns

`void`

***

### off()

> **off**(`event`): `this`

Defined in: [lib/ws.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L366)

取消监听

#### Parameters

##### event

`"error"` \| `"message"` \| `"end"` \| `"close"` \| `"timeout"` \| `"drain"`

#### Returns

`this`

***

### on()

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:327](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L327)

绑定监听

##### Parameters

###### event

`"message"`

###### cb

(`msg`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:331](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L331)

绑定监听

##### Parameters

###### event

`"error"`

###### cb

(`error`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:332](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L332)

绑定监听

##### Parameters

###### event

`"end"` \| `"close"` \| `"timeout"` \| `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### pause()

> **pause**(): `void`

Defined in: [lib/ws.ts:380](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L380)

暂停向消息监听器派发数据，底层仍只保留有界缓存

#### Returns

`void`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:437](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L437)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:448](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L448)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### resume()

> **resume**(): `void`

Defined in: [lib/ws.ts:385](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L385)

恢复向消息监听器派发数据

#### Returns

`void`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:407](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L407)

发送二进制

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:399](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L399)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:391](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L391)

发送文本

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`
