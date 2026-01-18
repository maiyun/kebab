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

Defined in: [lib/ws.ts:346](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L346)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:351](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L351)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:358](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L358)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:341](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L341)

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

Defined in: [lib/ws.ts:312](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L312)

#### Returns

`void`

***

### end()

> **end**(): `void`

Defined in: [lib/ws.ts:308](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L308)

#### Returns

`void`

***

### on()

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:268](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L268)

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

Defined in: [lib/ws.ts:272](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L272)

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

Defined in: [lib/ws.ts:273](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L273)

绑定监听

##### Parameters

###### event

`"end"` | `"close"` | `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:363](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L363)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:374](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L374)

发送 ping

#### Parameters

##### data?

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:333](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L333)

发送二进制

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:325](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L325)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:317](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L317)

发送文本

#### Parameters

##### data

`string` | `Buffer`\<`ArrayBufferLike`\> | (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`
