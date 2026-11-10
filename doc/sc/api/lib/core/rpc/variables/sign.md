[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / sign

# Variable: sign

> `const` **sign**: (`message`, `secret`, `method?`, `bodyHash?`) => `string` = `implementation.sign`

Defined in: lib/core/rpc.ts:41

加密认证命令、HTTP 方法和请求体摘要；自动生成时间与 nonce

## Parameters

### message

`Record`\<`string`, `unknown`\>

动作及参数

### secret

`string`

RPC 密钥

### method?

`string`

HTTP 方法，默认 GET

### bodyHash?

`string`

请求体的 SHA-256，默认空内容摘要

## Returns

`string`

URL 中的命令；密钥不合格时返回不可认证标记
