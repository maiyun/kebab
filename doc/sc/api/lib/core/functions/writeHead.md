[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeHead

# Function: writeHead()

> **writeHead**(`res`, `statusCode`, `headers?`): `void`

Defined in: [lib/core.ts:1002](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1002)

让 res 发送头部（前提是头部没有被发送才能调用本方法

## Parameters

### res

响应对象

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### statusCode

`number`

状态码

### headers?

`OutgoingHttpHeaders`

头部

## Returns

`void`
