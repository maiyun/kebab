[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / postResponseJson

# Function: postResponseJson()

> **postResponseJson**(`u`, `data`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:268](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L268)

发起 POST 请求并解析 JSON 响应

## Parameters

### u

`string`

网址

### data

`Record`\<`string`, [`Json`](../../../index/type-aliases/Json.md)\>

数据

### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md) = `{}`

选项

## Returns

`Promise`\<`any`\>

最后一次响应的 JSON 数据，重试验证未通过也保留；请求或读取失败返回 null；JSON 解析失败返回 false
