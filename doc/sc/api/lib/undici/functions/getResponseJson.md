[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getResponseJson

# Function: getResponseJson()

> **getResponseJson**(`u`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:281](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L281)

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

最后一次响应的 JSON 数据，重试验证未通过也保留；请求或读取失败返回 null；JSON 解析失败返回 false
