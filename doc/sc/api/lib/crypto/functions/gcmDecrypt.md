[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / gcmDecrypt

# Function: gcmDecrypt()

## Call Signature

> **gcmDecrypt**(`encrypt`, `key`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:354](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L354)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **gcmDecrypt**(`encrypt`, `key`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:355](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L355)

AES 解密

### Parameters

#### encrypt

需解密的字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥 32 个英文字母和数字

#### output?

`"binary"`

输出类型

### Returns

`string` \| `false`
