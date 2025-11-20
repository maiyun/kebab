[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / generateKeyPair

# Function: generateKeyPair()

> **generateKeyPair**(`type`, `options`): `Promise`\<\{ `private`: `string` \| `Buffer`\<`ArrayBufferLike`\>; `public`: `string` \| `Buffer`\<`ArrayBufferLike`\>; \}\>

Defined in: [lib/crypto.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L18)

创建非对称秘钥

## Parameters

### type

`string`

如 rsa/ec

### options

参数

#### modulusLength?

`number`

#### namedCurve?

`string`

#### privateKeyEncoding?

\{ `format?`: `"pem"` \| `"der"`; `type?`: `"pkcs8"` \| `"pkcs1"` \| `"sec1"`; \}

#### privateKeyEncoding.format?

`"pem"` \| `"der"`

#### privateKeyEncoding.type?

`"pkcs8"` \| `"pkcs1"` \| `"sec1"`

#### publicKeyEncoding?

\{ `format?`: `"pem"` \| `"der"`; `type?`: `"spki"` \| `"pkcs1"`; \}

#### publicKeyEncoding.format?

`"pem"` \| `"der"`

#### publicKeyEncoding.type?

`"spki"` \| `"pkcs1"`

## Returns

`Promise`\<\{ `private`: `string` \| `Buffer`\<`ArrayBufferLike`\>; `public`: `string` \| `Buffer`\<`ArrayBufferLike`\>; \}\>
