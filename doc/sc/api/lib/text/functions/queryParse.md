[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / queryParse

# Function: queryParse()

> **queryParse**(`query`): `Record`\<`string`, `string` \| `string`[]\>

Defined in: [lib/text.ts:527](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L527)

将 query string 转换为对象

## Parameters

### query

`string`

要转换的字符串，+ 表示空格，%2B 表示加号

## Returns

`Record`\<`string`, `string` \| `string`[]\>

查询参数对象，重复键对应字符串数组
