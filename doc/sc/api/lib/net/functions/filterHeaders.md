[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / filterHeaders

# Function: filterHeaders()

> **filterHeaders**(`headers`, `res?`, `filter?`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/net.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L717)

剔除不代理的 header，返回新的 header

## Parameters

### headers

`IncomingHttpHeaders` \| `IncomingHttpHeaders` \| [`THttpHeaders`](../type-aliases/THttpHeaders.md)

剔除前的 header

### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

直接设置头部而不返回，可置空

### filter?

(`h`) => `boolean`

返回 true 则留下

## Returns

`Record`\<`string`, `string` \| `string`[]\>
