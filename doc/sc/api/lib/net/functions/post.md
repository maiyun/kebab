[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / post

# Function: post()

> **post**(`u`, `data`, `opt?`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L79)

发起一个 post 请求

## Parameters

### u

`string`

请求的 URL

### data

`string` \| `Record`\<`string`, `any`\> \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

要发送的数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>
