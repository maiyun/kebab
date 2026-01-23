[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / verify

# Function: verify()

> **verify**(`data`, `object`, `signature`, `algorithm`): `boolean`

Defined in: [lib/crypto.ts:90](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L90)

非对称验签

## Parameters

### data

`BinaryLike`

数据

### object

证书

`KeyLike` | `VerifyKeyObjectInput` | `VerifyPublicKeyInput` | `VerifyJsonWebKeyInput`

### signature

`ArrayBufferView`

签名

### algorithm

`string` = `'sha256'`

哈希方式

## Returns

`boolean`
