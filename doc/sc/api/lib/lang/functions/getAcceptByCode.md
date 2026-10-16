[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/lang](../index.md) / getAcceptByCode

# Function: getAcceptByCode()

> **getAcceptByCode**(`code?`): `string`

Defined in: [lib/lang.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/lang.ts#L55)

根据框架语言 code 获取浏览器标准语言标识,可用于 HTML lang 和 Intl

## Parameters

### code?

`string`

框架语言 code,不区分大小写；未传或不支持时回退 en

## Returns

`string`

sc 返回 zh-CN,tc 返回 zh-TW,其余支持的语言返回原 code
