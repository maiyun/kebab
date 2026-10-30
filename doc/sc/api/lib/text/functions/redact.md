[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / redact

# Function: redact()

> **redact**(`value`, `secrets`, `options?`): `string`

Defined in: [lib/text.ts:878](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L878)

将文本中的指定敏感字符串替换为占位文本

## Parameters

### value

`string`

待处理文本

### secrets

readonly `string`[]

敏感字符串，忽略空项和重复项，不修改数组

### options?

替换选项

#### encoded?

`boolean`

是否同时匹配编码形式，默认 true；包括 encodeURIComponent 生成形式
（百分号十六进制不区分大小写）和 JSON.stringify 生成的转义正文，不含外层引号；
孤立代理项跳过 URI 编码，仍匹配原文及 JSON 转义形式

#### replacement?

`string`

替换文本，默认 [REDACTED]，按字面量插入且不参与后续匹配

## Returns

`string`

处理后的文本；原文区分大小写，从左向右匹配，同一位置优先最长串，匹配范围不重叠
