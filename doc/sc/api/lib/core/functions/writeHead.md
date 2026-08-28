[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeHead

# Function: writeHead()

> **writeHead**(`res`, `statusCode`, `headers?`): `void`

Defined in: [lib/core.ts:1433](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1433)

提交 HTTP 响应状态和头部，兼容 HTTP/1.1 与 HTTP/2

`setHeader()` 只暂存或修改单个头部，不会发送响应头，也不能提交状态码；在响应头提交前可反复调用。
本方法会立即提交状态码和此前设置的全部头部，必须在所有 `setHeader()` 调用之后、首次
`write()`、`end()` 或 `pipe()` 之前调用。提交后再调用 `setHeader()` 会抛出 `ERR_HTTP_HEADERS_SENT`。

普通控制器应设置 `_httpCode`、调用 `_res.setHeader()` 并直接返回内容，由路由层统一提交响应头。
仅框架内部或手动接管响应（错误、重定向、代理、流式输出等）时才应直接调用本方法。

## Parameters

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

响应对象

### statusCode

`number`

HTTP 状态码

### headers?

`OutgoingHttpHeaders`

随本次提交附加的头部；通常优先在提交前使用 `setHeader()`

## Returns

`void`

无返回值
