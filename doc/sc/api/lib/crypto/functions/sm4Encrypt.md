[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sm4Encrypt

# Function: sm4Encrypt()

## Call Signature

> **sm4Encrypt**(`original`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:260](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L260)

SM4 加密

### Parameters

#### original

原始字符串

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

> **sm4Encrypt**(`original`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:261](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L261)

SM4 加密

### Parameters

#### original

原始字符串

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

`"base64"`

### Returns

`string` \| `false`
