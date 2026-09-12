[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:163](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L163)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:192](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L192)

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

Defined in: [lib/ws.ts:664](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L664)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:669](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L669)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:676](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L676)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:659](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L659)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt?`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:225](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L225)

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

Defined in: [lib/ws.ts:576](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L576)

#### Returns

`void`

***

### end()

> **end**(`code?`, `reason?`): `void`

Defined in: [lib/ws.ts:568](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L568)

正常结束 WebSocket 连接

#### Parameters

##### code?

`number` = `1000`

WebSocket 关闭码

##### reason?

`string` = `''`

关闭原因，超过协议上限时自动安全截断

#### Returns

`void`

***

### off()

> **off**(`event`): `this`

Defined in: [lib/ws.ts:558](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L558)

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

Defined in: [lib/ws.ts:512](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L512)

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

Defined in: [lib/ws.ts:516](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L516)

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

Defined in: [lib/ws.ts:517](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L517)

绑定监听

##### Parameters

###### event

`"close"`

###### cb

(`info`) => `void` \| `Promise`\<`void`\>

##### Returns

`this`

#### Call Signature

> **on**(`event`, `cb`): `this`

Defined in: [lib/ws.ts:518](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L518)

绑定监听

##### Parameters

###### event

`"end"` \| `"timeout"` \| `"drain"`

###### cb

() => `void` \| `Promise`\<`void`\>

##### Returns

`this`

***

### pause()

> **pause**(): `void`

Defined in: [lib/ws.ts:582](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L582)

暂停向消息监听器派发数据，并暂停底层 TCP 读取

#### Returns

`void`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:681](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L681)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:686](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L686)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### resume()

> **resume**(): `void`

Defined in: [lib/ws.ts:588](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L588)

恢复派发缓存消息，并恢复底层 TCP 读取

#### Returns

`void`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:607](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L607)

发送二进制

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:602](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L602)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:597](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L597)

发送文本

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`
