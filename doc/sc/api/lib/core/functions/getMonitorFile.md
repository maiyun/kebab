[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / getMonitorFile

# Function: getMonitorFile()

> **getMonitorFile**(`opt`): `Promise`\<`false` \| [`Response`](../../undici/response/classes/Response.md) \| `null`\>

Defined in: [lib/core.ts:1481](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1481)

获取监控原始文件的响应，可使用 getStream() 下载；小文件可用 getText()/getJson() 预览

## Parameters

### opt

path 使用事件 files 中的文件路径；preview=true 只允许 1 MiB 内的 JSON/调用栈文本；host 默认本机

#### host?

`string`

#### path

`string`

#### preview?

`boolean`

## Returns

`Promise`\<`false` \| [`Response`](../../undici/response/classes/Response.md) \| `null`\>

文件响应；不存在时返回 null，参数、预览限制、配置或读取错误时返回 false；流消费或销毁由调用方负责
