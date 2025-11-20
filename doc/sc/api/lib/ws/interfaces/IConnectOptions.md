[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IConnectOptions

# Interface: IConnectOptions

Defined in: [lib/ws.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L34)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](../../net/interfaces/ICookie.md)\>

Defined in: [lib/ws.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L42)

cookie 托管对象

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L40)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L38)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/ws.ts:39](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L39)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/ws.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L46)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:44](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L44)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/ws.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L48)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/ws.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L36)

秒数
