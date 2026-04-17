[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/socket](../index.md) / IRwebsocketOptions

# Interface: IRwebsocketOptions

Defined in: [lib/socket.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L13)

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/socket.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L20)

cookie 托管对象

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/socket.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L18)

***

### hosts?

> `optional` **hosts?**: `Record`\<`string`, `string`\>

Defined in: [lib/socket.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L16)

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/socket.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L17)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/socket.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L24)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../../ws/enumerations/EFrameReceiveMode.md)

Defined in: [lib/socket.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L22)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/socket.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L26)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/socket.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/socket.ts#L15)

秒数
