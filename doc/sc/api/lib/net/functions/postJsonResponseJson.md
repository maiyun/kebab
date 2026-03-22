[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / postJsonResponseJson

# Function: postJsonResponseJson()

> **postJsonResponseJson**(`u`, `data`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/net.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L111)

发起 JSON 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### data

`any`[] \| `Record`\<`string`, `any`\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据，失败时返回 null
