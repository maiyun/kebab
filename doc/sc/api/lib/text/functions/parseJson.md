[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseJson

# Function: parseJson()

> **parseJson**\<`T`\>(`str`): `false` \| `T`

Defined in: [lib/text.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L703)

解析 JSON，超出安全整数范围的整数字面量转换为 BigInt

## Type Parameters

### T

`T`

## Parameters

### str

`string`

要解析的 json 字符串

## Returns

`false` \| `T`

解析结果，无效 JSON 返回 false；小数及指数形式仍为 number
