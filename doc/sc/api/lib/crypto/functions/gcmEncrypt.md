[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / gcmEncrypt

# Function: gcmEncrypt()

## Call Signature

> **gcmEncrypt**(`original`, `key`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:241](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L241)

AES GCM 托管加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **gcmEncrypt**(`original`, `key`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:242](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L242)

AES GCM 托管加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### output?

`"base64"`

输出类型

### Returns

`string` \| `false`
