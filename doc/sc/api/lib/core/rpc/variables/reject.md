[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / reject

# Variable: reject

> `const` **reject**: (`req`) => `boolean` = `implementation.reject`

Defined in: lib/core/rpc.ts:60

记录 socket IP 的失败次数

## Parameters

### req

`http.IncomingMessage`

被拒绝的请求

## Returns

`boolean`

每个限速窗口仅首次失败返回 true，供审计
