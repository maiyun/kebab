[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / cipherEncrypt

# Function: cipherEncrypt()

> **cipherEncrypt**(`original`, `key`, `iv`, `method`, `output`): `string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:167](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L167)

cipher 加密，强烈不建议使用 AES_256_ECB

## Parameters

### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

### key

`CipherKey`

密钥 32 个英文字母和数字

### iv

`string` = `''`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

### method

`string` = `AES_256_ECB`

加密方法

### output

输出类型

`"buffer"` | `"base64"`

## Returns

`string` \| `false` \| `Buffer`\<`ArrayBufferLike`\>
