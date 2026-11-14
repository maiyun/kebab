[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / passwordVerify

# Function: passwordVerify()

> **passwordVerify**(`password`, `encoded`): `Promise`\<`boolean` \| `null`\>

Defined in: [lib/crypto.ts:499](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L499)

使用散列中保存的参数验证密码
接受 Argon2id v19，成本范围与 IPasswordOptions 相同，盐为 8～64 字节、散列为 16～64 字节。

## Parameters

### password

`string`

原始密码，按 UTF-8 编码

### encoded

`string`

数据库存储的 PHC 字符串，不接受客户端指定的散列

## Returns

`Promise`\<`boolean` \| `null`\>

匹配返回 true；不匹配、格式不支持或参数越界返回 false；环境不支持或计算失败时返回 null
