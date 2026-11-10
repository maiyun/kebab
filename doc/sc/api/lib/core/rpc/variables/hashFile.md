[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / hashFile

# Variable: hashFile

> `const` **hashFile**: (`file`) => `Promise`\<`string` \| `false`\> = `implementation.hashFile`

Defined in: [lib/core/rpc.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/core/rpc.ts#L31)

流式计算文件的 SHA-256

## Parameters

### file

`string`

文件路径

## Returns

`Promise`\<`string` \| `false`\>

小写十六进制摘要；读取失败返回 false
