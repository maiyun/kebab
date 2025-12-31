[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / str2int

# Function: str2int()

> **str2int**(`str`, `digits`): `number`

Defined in: [lib/text.ts:649](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L649)

为解决精度问题，将字符串数字转换为整数显示
以下几个示例都是当 digits 为 2 时
str 传入 '1.234'，返回 123
str 传入 '1.235'，返回 124
str 传入 '1.1'，返回 110
str 传入 '6'，返回 600

## Parameters

### str

`string`

要转换的数字字符串

### digits

`number` = `3`

小数点右移位数

## Returns

`number`
