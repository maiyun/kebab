[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / parseVersion

# Function: parseVersion()

> **parseVersion**(`value`): \[`number`, `number`, `number`\] \| `null`

Defined in: [lib/text.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L16)

解析三段正式发行版本 X.Y.Z，不接受前导零、预发行和构建后缀

## Parameters

### value

`unknown`

待解析的版本

## Returns

\[`number`, `number`, `number`\] \| `null`

三段安全整数，无效时返回 null
