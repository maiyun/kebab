[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmacFile

# Function: hashHmacFile()

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key?`, `encoding?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/crypto.ts:407](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L407)

hash 或 hmac 加密文件

### Parameters

#### algorithm

`string`

加密方式，如 md5、sha256、sm3 等

#### path

`string`

文件路径

#### key?

`CipherKey`

设置则采用 hmac 加密

#### encoding?

`"hex"` | `"base64"` | `"base64url"`

### Returns

`Promise`\<`string` \| `false`\>

## Call Signature

> **hashHmacFile**(`algorithm`, `path`, `key`, `encoding`): `Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [lib/crypto.ts:408](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L408)

hash 或 hmac 加密文件

### Parameters

#### algorithm

`string`

加密方式，如 md5、sha256、sm3 等

#### path

`string`

文件路径

#### key

`CipherKey`

设置则采用 hmac 加密

#### encoding

`"buffer"`

### Returns

`Promise`\<`false` \| `Buffer`\<`ArrayBufferLike`\>\>
