[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / getResponseJson

# Function: getResponseJson()

## Call Signature

> **getResponseJson**(`u`, `opt?`): `Promise`\<`any`\>

Defined in: [lib/undici.ts:307](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L307)

发起 GET 请求并解析 JSON 响应

### Parameters

#### u

`string`

网址

#### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md)

选项

### Returns

`Promise`\<`any`\>

最后一次响应的 JSON 数据，重试验证未通过也保留；请求或读取失败返回 null；JSON 解析失败返回 false

## Call Signature

> **getResponseJson**\<`T`\>(`u`, `opt?`): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [lib/undici.ts:315](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L315)

发起 GET 请求并解析 JSON 响应

### Type Parameters

#### T

`T`

预期的响应类型，解析时只检查 JSON 语法

### Parameters

#### u

`string`

网址

#### opt?

[`IRequestOptions`](../interfaces/IRequestOptions.md)

选项

### Returns

`Promise`\<`false` \| `T` \| `null`\>

最后一次响应的 JSON 数据，重试验证未通过也保留；请求或读取失败返回 null；JSON 解析失败返回 false
