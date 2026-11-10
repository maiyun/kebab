[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / readBody

# Variable: readBody

> `const` **readBody**: (`req`, `expected`, `directory`, `upload`, `limit`) => `Promise`\<\{ `body?`: `Buffer`; `file?`: `string`; \} \| `false`\> = `implementation.readBody`

Defined in: [lib/core/rpc.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/core/rpc.ts#L71)

按字节上限读取并校验请求体；上传的临时文件由调用方删除

## Parameters

### req

`http.IncomingMessage`

请求流

### expected

`string`

已认证的 SHA-256 摘要

### directory

`string`

临时文件目录

### upload

`boolean`

是否将请求体写入临时文件

### limit

`number`

允许的最大字节数

## Returns

`Promise`\<\{ `body?`: `Buffer`; `file?`: `string`; \} \| `false`\>

内存内容或临时文件；失败返回 false 并清理临时文件
