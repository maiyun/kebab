[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / postResponseJson

# Function: postResponseJson()

> **postResponseJson**(`u`, `data`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/net.ts:135](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L135)

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

JSON 数据，失败时返回 null
