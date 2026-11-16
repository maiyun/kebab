[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendVhost

# Function: sendVhost()

> **sendVhost**(`files`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:1123](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1123)

全量替换各节点 conf/vhost/ 中的文件，不自动 reload

## Parameters

### files

`Record`\<`string`, `string`\>

文件名与 JSON 原文的非空集合；仅允许直接 .json 文件名，内容为 IVhost 或 IVhost[]

### hosts?

`string`[] \| `"config"`

节点列表，config 使用全局 hosts；省略或列表为空时更新本机

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

各节点的写入结果；成功表示目录替换完成，需自行调用 sendReload 生效
