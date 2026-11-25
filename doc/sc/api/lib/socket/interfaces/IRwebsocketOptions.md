[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/socket](../index.md) / IRwebsocketOptions

# Interface: IRwebsocketOptions

Defined in: [lib/socket.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L15)

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/socket.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L25)

cookie 托管对象

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/socket.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L23)

握手请求头

***

### hosts?

> `optional` **hosts?**: `Record`\<`string`, `string`\>

Defined in: [lib/socket.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L19)

自定义域名到 IP 映射

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/socket.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L21)

使用的本地网卡 IP

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/socket.ts:29](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L29)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../../ws/enumerations/EFrameReceiveMode.md)

Defined in: [lib/socket.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L27)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/socket.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L31)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/socket.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L17)

超时秒数
