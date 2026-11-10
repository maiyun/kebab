[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/core/rpc](../index.md) / validSecret

# Variable: validSecret

> `const` **validSecret**: (`secret`) => `secret is string` = `implementation.validSecret`

Defined in: [lib/core/rpc.ts:17](https://github.com/maiyunnet/kebab/blob/master/lib/core/rpc.ts#L17)

校验密钥：至少 32 个字符，去除首尾空白后拒绝占位值及短重复模式

## Parameters

### secret

`unknown`

待校验密钥

## Returns

`secret is string`

密钥是否合格
