[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L95)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L100)

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

Defined in: [lib/ws.ts:366](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L366)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:371](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L371)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:378](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L378)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:361](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L361)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L123)

以客户端形式发起链接

#### Parameters

##### u

`string`

以 ws, wss 开头的地址

##### opt

[`IConnectOptions`](../interfaces/IConnectOptions.md) = `{}`

参数

#### Returns

`Promise`\<`Socket` \| `null`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [lib/ws.ts:332](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L332)

#### Returns

`void`

***

### end()

> **end**(): `void`

Defined in: [lib/ws.ts:328](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L328)

#### Returns

`void`

***

### off()

> **off**(`event`): `this`

Defined in: [lib/ws.ts:323](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L323)

取消监听

#### Parameters

##### event

`"error"` | `"message"` | `"end"` | `"close"` | `"timeout"` | `"drain"`

#### Returns

`this`

***

### on()

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:282](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L282)

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

Defined in: [lib/ws.ts:286](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L286)

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

Defined in: [lib/ws.ts:287](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L287)

绑定监听

##### Parameters

###### event

`"end"` | `"close"` | `"timeout"` | `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:383](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L383)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:394](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L394)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:353](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L353)

发送二进制

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:345](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L345)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:337](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L337)

发送文本

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`
