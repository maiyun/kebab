[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / aesDecrypt

# Function: aesDecrypt()

## Call Signature

> **aesDecrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:340](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L340)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **aesDecrypt**(`encrypt`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:341](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L341)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv?

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"binary"`

### Returns

`string` \| `false`
