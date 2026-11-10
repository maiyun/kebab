[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / urlResolve

# Function: urlResolve()

> **urlResolve**(`from`, `to`, `limit?`): `string`

Defined in: [lib/text.ts:219](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L219)

将相对路径根据基准路径进行转换

## Parameters

### from

`string`

基准路径

### to

`string`

相对路径

### limit?

`boolean` = `false`

是否将基准路径视作目录并限定结果不能逃逸，默认 false

## Returns

`string`

转换后的地址，超出限定目录时返回基准目录
