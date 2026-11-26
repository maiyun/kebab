[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseJson

# Function: parseJson()

## Call Signature

> **parseJson**(`str`): `any`

Defined in: [lib/text.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L710)

解析 JSON，未指定类型时返回动态值

### Parameters

#### str

`string`

要解析的 JSON 字符串

### Returns

`any`

解析结果，无效 JSON 返回 false；超出安全整数范围的整数字面量转换为 BigInt

## Call Signature

> **parseJson**\<`T`\>(`str`): `false` \| `T`

Defined in: [lib/text.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L717)

解析 JSON，按调用方指定的类型返回结果

### Type Parameters

#### T

`T`

预期的结果类型，解析时只检查 JSON 语法

### Parameters

#### str

`string`

要解析的 JSON 字符串

### Returns

`false` \| `T`

解析结果，无效 JSON 返回 false；超出安全整数范围的整数字面量转换为 BigInt，小数及指数形式仍为 number
