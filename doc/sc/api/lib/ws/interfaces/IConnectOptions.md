[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IConnectOptions

# Interface: IConnectOptions

Defined in: [lib/ws.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L35)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/ws.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L43)

cookie 托管对象

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L41)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L39)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L40)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L47)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L45)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ws.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L49)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L37)

秒数
