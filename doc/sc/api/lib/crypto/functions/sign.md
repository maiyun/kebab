[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / sign

# Function: sign()

## Call Signature

> **sign**(`data`, `privateKey`, `format`, `algorithm?`): `string`

Defined in: [lib/crypto.ts:69](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L69)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

`KeyLike` \| `SignKeyObjectInput` \| `SignPrivateKeyInput` \| `SignJsonWebKeyInput`

私钥

#### format

`"binary"` \| `"hex"` \| `"base64"`

输出格式

#### algorithm?

`string`

哈希方式

### Returns

`string`

## Call Signature

> **sign**(`data`, `privateKey`, `format?`, `algorithm?`): `Buffer`

Defined in: [lib/crypto.ts:72](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L72)

非对称加签

### Parameters

#### data

`BinaryLike`

数据

#### privateKey

`KeyLike` \| `SignKeyObjectInput` \| `SignPrivateKeyInput` \| `SignJsonWebKeyInput`

私钥

#### format?

`"buffer"`

输出格式

#### algorithm?

`string`

哈希方式

### Returns

`Buffer`
