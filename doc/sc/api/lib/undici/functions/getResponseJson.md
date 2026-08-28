[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getResponseJson

# Function: getResponseJson()

> **getResponseJson**(`u`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:248](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L248)

发起 GET 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

JSON 数据；请求失败返回 null；JSON 解析失败返回 false
