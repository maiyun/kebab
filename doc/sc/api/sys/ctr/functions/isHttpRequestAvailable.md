[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / isHttpRequestAvailable

# Function: isHttpRequestAvailable()

> **isHttpRequestAvailable**(`req`, `res`): `boolean`

Defined in: [sys/ctr.ts:123](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L123)

判断当前 HTTP 请求是否仍可响应

## Parameters

### req

`IncomingMessage` \| `Http2ServerRequest`

请求对象

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

响应对象

## Returns

`boolean`

客户端对应的请求流仍可响应时返回 true
