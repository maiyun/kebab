[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / writeEventStreamHead

# Function: writeEventStreamHead()

> **writeEventStreamHead**(`res`): `void`

Defined in: [lib/core.ts:1454](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1454)

提交服务器发送事件（SSE）响应头

在发送第一条事件前调用一次，固定提交状态码 200、事件流内容类型和禁止缓存头部。
SSE 的内容长度和结束时间未知，因此不设置 `content-length`；调用后响应头已经提交，
不能再调用 `setHeader()`，后续应使用 `write()` 持续发送事件，并由调用方在结束时关闭响应。

## Parameters

### res

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

响应对象

## Returns

`void`

无返回值
