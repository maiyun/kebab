[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / authenticate

# Variable: authenticate

> `const` **authenticate**: (`req`, `secret`) => [`IMessage`](../interfaces/IMessage.md) \| `false` = `implementation.authenticate`

Defined in: lib/core/rpc.ts:51

校验密钥、方法及距当前时间不超过 5 秒的命令，并登记未使用的 nonce

## Parameters

### req

`http.IncomingMessage`

请求，使用 URL、方法和 socket IP

### secret

`unknown`

RPC 密钥

## Returns

[`IMessage`](../interfaces/IMessage.md) \| `false`

认证命令；无效或已用 nonce、限速及缓存满时返回 false
