[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / readToResponse

# Function: readToResponse()

> **readToResponse**(`path`, `req`, `res`, `stat?`): `Promise`\<`void`\>

Defined in: [lib/fs.ts:480](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L480)

读取文件并输出到 http 的 response，支持 GET 字节范围与条件请求

Range 支持 start-end、start-、-length 及最多 16 段，请求头上限 8 KiB；相邻和重叠区间合并。
有效区间返回 206，全部越界或区间过多返回 416；无效语法、未知单位和空文件忽略 Range。
部分响应按原始文件字节流式输出，不进行动态压缩。If-Range 日期须匹配 Last-Modified，
且文件不启用动态压缩、修改时间早于当前响应所在秒，否则退回完整响应；
文件元数据生成的 ETag 为弱校验值，不接受其作为 If-Range 的强校验值。
HEAD 忽略 Range 且不输出响应体。

## Parameters

### path

`string`

文件绝对路径

### req

`IncomingMessage` \| `Http2ServerRequest`

http 请求对象

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

http 响应对象

### stat?

`Stats` \| `null`

文件的 stat（如果有）

## Returns

`Promise`\<`void`\>

输出完成或连接终止后无返回值
