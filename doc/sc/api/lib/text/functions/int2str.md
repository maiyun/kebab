[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / int2str

# Function: int2str()

> **int2str**(`int`, `digits`, `decimal`): `string`

Defined in: [lib/text.ts:697](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L697)

为解决精度问题，将整数转换为小数字符串
以下几个示例都是当 digits 为 3、decimal 为 2 时
int 传入 2341，返回 '2.34'
int 传入 2345，返回 '2.35'
int 传入 23，返回 '0.02'
int 传入 2，返回 '0.00'

## Parameters

### int

`number`

要转换的整数

### digits

`number` = `4`

小数点左移位数

### decimal

`number` = `2`

最终保留的小数位数

## Returns

`string`
