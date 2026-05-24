[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/response](../index.md) / Response

# Class: Response

Defined in: [lib/undici/response.ts:13](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L13)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/undici/response.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L26)

#### Parameters

##### req

`ResponseData`\<`null`\> \| `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/undici/response.ts:21](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L21)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/undici/response.ts:19](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L19)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/undici/response.ts:33](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L33)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getJson()

> **getJson**(): `Promise`\<`any`\>

Defined in: [lib/undici/response.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L66)

读取所有内容为 JSON，失败返回 null

#### Returns

`Promise`\<`any`\>

***

### getRawStream()

> **getRawStream**(): `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:128](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L128)

获取原生响应读取流对象

#### Returns

`BodyReadable` & `BodyMixin` \| `null`

***

### getStream()

> **getStream**(): `BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L92)

获取响应读取流对象

#### Returns

`BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

***

### getText()

> **getText**(): `Promise`\<`string` \| `null`\>

Defined in: [lib/undici/response.ts:51](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L51)

读取所有内容为文本

#### Returns

`Promise`\<`string` \| `null`\>

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/undici/response.ts:84](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L84)

用户自定义的 content 内容

#### Parameters

##### v

`string` \| `Buffer`\<`ArrayBufferLike`\>

内容值

#### Returns

`void`
