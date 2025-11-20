[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / aesEncrypt

# Function: aesEncrypt()

## Call Signature

> **aesEncrypt**(`original`, `key`, `iv`, `method`, `output`): `false` \| `Buffer`\<`ArrayBufferLike`\>

Defined in: [lib/crypto.ts:226](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L226)

AES 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### iv

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method

`string`

加密方法

#### output

`"buffer"`

输出类型

### Returns

`false` \| `Buffer`\<`ArrayBufferLike`\>

## Call Signature

> **aesEncrypt**(`original`, `key`, `iv?`, `method?`, `output?`): `string` \| `false`

Defined in: [lib/crypto.ts:227](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L227)

AES 加密

### Parameters

#### original

原始字符串

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

`CipherKey`

密钥尽量 32 个英文字母和数字，不是 32 个系统会自动处理

#### iv?

`string`

向量 16(CTR) 或 12(GCM) 个英文字母和数字

#### method?

`string`

加密方法

#### output?

`"base64"`

输出类型

### Returns

`string` \| `false`
