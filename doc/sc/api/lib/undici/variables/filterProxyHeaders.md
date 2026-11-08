[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / filterProxyHeaders

# Variable: filterProxyHeaders

> `const` **filterProxyHeaders**: (`headers`, `res?`, `filter?`) => `Record`\<`string`, `string` \| `string`[]\> = `lProxy.filterProxyHeaders`

Defined in: [lib/undici.ts:669](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L669)

过滤代理请求或响应的基础头部，不生成或清理来源信息

## Parameters

### headers

`http.IncomingHttpHeaders` \| `http2.IncomingHttpHeaders` \| [`THttpHeaders`](../type-aliases/THttpHeaders.md)

待过滤的头部

### res?

`http2.Http2ServerResponse` \| `http.ServerResponse`

传入时直接设置响应头并返回空对象，响应头已发送时不再写入

### filter?

(`h`) => `boolean`

业务过滤，返回 true 则保留

## Returns

`Record`\<`string`, `string` \| `string`[]\>

过滤后的头部，不修改输入
