[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / Socket

# Class: Socket

Defined in: [lib/ws.ts:169](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L169)

## Constructors

### Constructor

> **new Socket**(`request?`, `socket?`, `head?`, `options?`): `Socket`

Defined in: [lib/ws.ts:198](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L198)

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

Defined in: [lib/ws.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L673)

当前是否已经结束读取，并且无法继续读取

##### Returns

`boolean`

***

### finished

#### Get Signature

> **get** **finished**(): `boolean`

Defined in: [lib/ws.ts:678](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L678)

当前是否已经结束写入，并且无法继续写入

##### Returns

`boolean`

***

### isServer

#### Get Signature

> **get** **isServer**(): `boolean`

Defined in: [lib/ws.ts:685](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L685)

当前连接是不是服务器连接

##### Returns

`boolean`

***

### writable

#### Get Signature

> **get** **writable**(): `boolean`

Defined in: [lib/ws.ts:668](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L668)

当前是否是可写状态

##### Returns

`boolean`

## Methods

### connect()

> **connect**(`u`, `opt?`): `Promise`\<`Socket` \| `null`\>

Defined in: [lib/ws.ts:231](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L231)

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

Defined in: [lib/ws.ts:585](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L585)

#### Returns

`void`

***

### end()

> **end**(`code?`, `reason?`): `void`

Defined in: [lib/ws.ts:577](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L577)

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

Defined in: [lib/ws.ts:567](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L567)

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

Defined in: [lib/ws.ts:521](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L521)

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

Defined in: [lib/ws.ts:525](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L525)

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

Defined in: [lib/ws.ts:526](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L526)

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

Defined in: [lib/ws.ts:527](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L527)

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

Defined in: [lib/ws.ts:591](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L591)

暂停向消息监听器派发数据，并暂停底层 TCP 读取

#### Returns

`void`

***

### ping()

> **ping**(`data?`): `boolean`

Defined in: [lib/ws.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L690)

发送 ping

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### pong()

> **pong**(`data?`): `boolean`

Defined in: [lib/ws.ts:695](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L695)

发送 pong

#### Parameters

##### data?

`string` \| `Buffer`\<`ArrayBufferLike`\>

#### Returns

`boolean`

***

### resume()

> **resume**(): `void`

Defined in: [lib/ws.ts:597](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L597)

恢复派发缓存消息，并恢复底层 TCP 读取

#### Returns

`void`

***

### writeBinary()

> **writeBinary**(`data`): `boolean`

Defined in: [lib/ws.ts:616](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L616)

发送二进制

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`

***

### writeResult()

> **writeResult**(`data`): `boolean`

Defined in: [lib/ws.ts:611](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L611)

发送结果对象字符串

#### Parameters

##### data

`any`

#### Returns

`boolean`

***

### writeText()

> **writeText**(`data`): `boolean`

Defined in: [lib/ws.ts:606](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L606)

发送文本

#### Parameters

##### data

`string` \| `Buffer`\<`ArrayBufferLike`\> \| (`string` \| `Buffer`\<`ArrayBufferLike`\>)[]

#### Returns

`boolean`
