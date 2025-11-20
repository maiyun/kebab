[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / readToResponse

# Function: readToResponse()

> **readToResponse**(`path`, `req`, `res`, `stat?`): `Promise`\<`void`\>

Defined in: [lib/fs.ts:479](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L479)

读取文件并输出到 http 的 response

## Parameters

### path

`string`

文件绝对路径

### req

http 请求对象

`IncomingMessage` | `Http2ServerRequest`

### res

http 响应对象

`Http2ServerResponse`\<`Http2ServerRequest`\> | `ServerResponse`\<`IncomingMessage`\>

### stat?

文件的 stat（如果有）

`Stats` | `null`

## Returns

`Promise`\<`void`\>
