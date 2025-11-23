[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / createServer

# Function: createServer()

> **createServer**(`request`, `socket`, `head?`, `options?`): [`Socket`](../classes/Socket.md)

Defined in: [lib/ws.ts:393](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L393)

创建一个 ws 服务器接收处理器

## Parameters

### request

`IncomingMessage`

Http 请求端

### socket

`Socket`

响应双向 socket

### head?

`Buffer`\<`ArrayBufferLike`\>

### options?

#### headers?

`OutgoingHttpHeaders`

#### timeout?

`number`

## Returns

[`Socket`](../classes/Socket.md)
