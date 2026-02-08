[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / hashHmac

# Function: hashHmac()

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key?`, `format?`): `string`

Defined in: [lib/crypto.ts:394](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L394)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

源数据

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key?

`CipherKey`

设置则采用 hmac 加密

#### format?

`"hex"` | `"base64"`

### Returns

`string`

## Call Signature

> **hashHmac**(`algorithm`, `data`, `key`, `format`): `Buffer`

Defined in: [lib/crypto.ts:395](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L395)

hash 或 hmac 加密

### Parameters

#### algorithm

`string`

哈希方式

#### data

源数据

`string` | `Buffer`\<`ArrayBufferLike`\>

#### key

设置则采用 hmac 加密

`CipherKey` | `undefined`

#### format

`"buffer"`

### Returns

`Buffer`
