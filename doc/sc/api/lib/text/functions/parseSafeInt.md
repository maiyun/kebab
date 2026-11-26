[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseSafeInt

# Function: parseSafeInt()

> **parseSafeInt**(`val`, `opt?`): `number` \| `null`

Defined in: [lib/text.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L19)

将数字或纯整数字符串严格解析为安全整数，支持可选范围边界

## Parameters

### val

`unknown`

待解析的值（number 或十进制整数字符串，允许前后空白和可选负号）

### opt?

可选范围限制（min 最小值、max 最大值）

#### max?

`number`

#### min?

`number`

## Returns

`number` \| `null`

规范化后的安全整数，不合法或超出范围返回 null
