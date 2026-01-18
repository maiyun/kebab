[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / post

# Function: post()

> **post**(`u`, `data`, `opt`): `Promise`\<[`Response`](../response/classes/Response.md)\>

Defined in: [lib/net.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L77)

发起一个 post 请求

## Parameters

### u

`string`

请求的 URL

### data

要发送的数据

`string` | `Record`\<`string`, `any`\> | `Buffer`\<`ArrayBufferLike`\> | `Readable`

### opt

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

参数

## Returns

`Promise`\<[`Response`](../response/classes/Response.md)\>
