[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ls

# Function: ls()

> **ls**(`opt`): `Promise`\<`object`[]\>

Defined in: [lib/core.ts:1454](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1454)

获取目录内文件/文件夹列表

## Parameters

### opt

参数

#### encoding?

`BufferEncoding`

#### host?

`string`

获取局域网服务器的目录列表，为空代表获取本机的

#### path

`string`

相对运行根目录的路径，如 2024/08/01/22，可带首尾 /；拒绝越界的 .. 和软链接

## Returns

`Promise`\<`object`[]\>
