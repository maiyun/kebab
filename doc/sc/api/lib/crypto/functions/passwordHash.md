[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / passwordHash

# Function: passwordHash()

> **passwordHash**(`password`, `options?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/crypto.ts:488](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L488)

使用 Argon2id 生成包含随机盐和计算参数的密码散列
需要 Node.js 24.7.0+；固定使用 16 字节随机盐和 32 字节散列，不修改或截断密码。

## Parameters

### password

`string`

原始密码，按 UTF-8 编码；长度和强度由应用校验

### options?

[`IPasswordOptions`](../interfaces/IPasswordOptions.md) = `{}`

计算成本，省略时使用 64 MiB 内存、3 轮和并行度 1

## Returns

`Promise`\<`string` \| `false`\>

可直接保存的 PHC 字符串；参数无效、运行环境不支持或计算失败时返回 false
