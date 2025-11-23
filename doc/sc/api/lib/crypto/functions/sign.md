[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sign

# Function: sign()

## Call Signature

> **sign**(`data`, `privateKey`, `format`, `algorithm?`): `string`

Defined in: [lib/crypto.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L68)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

私钥

`KeyLike` | `SignKeyObjectInput` | `SignPrivateKeyInput` | `SignJsonWebKeyInput`

#### format

输出格式

`"hex"` | `"base64"` | `"binary"`

#### algorithm?

`string`

哈希方式

### Returns

`string`

## Call Signature

> **sign**(`data`, `privateKey`, `format?`, `algorithm?`): `Buffer`

Defined in: [lib/crypto.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L71)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

私钥

`KeyLike` | `SignKeyObjectInput` | `SignPrivateKeyInput` | `SignJsonWebKeyInput`

#### format?

`"buffer"`

输出格式

#### algorithm?

`string`

哈希方式

### Returns

`Buffer`
