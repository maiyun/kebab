[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / stringifyJson

# Function: stringifyJson()

> **stringifyJson**(`obj`, `space?`): `string`

Defined in: [lib/text.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L713)

将对象转换为 JSON 字符串，BigInt 输出为整数字面量

## Parameters

### obj

`any`

要转换的 json 对象

### space?

`string` \| `number`

美化方式

## Returns

`string`

JSON 字符串，循环引用等序列化错误沿用 JSON.stringify 异常
