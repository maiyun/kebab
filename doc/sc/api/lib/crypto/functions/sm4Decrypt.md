[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sm4Decrypt

# Function: sm4Decrypt()

## Call Signature

> **sm4Decrypt**(`encrypt`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:372](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L372)

SM4 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv

`string`

向量 16 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **sm4Decrypt**(`encrypt`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:373](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L373)

SM4 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### iv?

`string`

向量 16 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"binary"`

### Returns

`string` \| `false`
