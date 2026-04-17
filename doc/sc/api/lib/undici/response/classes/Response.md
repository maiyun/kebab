[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/response](../index.md) / Response

# Class: Response

Defined in: [lib/undici/response.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L12)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/undici/response.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L25)

#### Parameters

##### req

`ResponseData`\<`null`\> \| `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/undici/response.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L20)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/undici/response.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L18)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/undici/response.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L32)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getJson()

> **getJson**(): `Promise`\<`any`\>

Defined in: [lib/undici/response.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L63)

读取所有内容为 JSON

#### Returns

`Promise`\<`any`\>

***

### getRawStream()

> **getRawStream**(): `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:124](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L124)

获取原生响应读取流对象

#### Returns

`BodyReadable` & `BodyMixin` \| `null`

***

### getStream()

> **getStream**(): `BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L88)

获取响应读取流对象

#### Returns

`BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

***

### getText()

> **getText**(): `Promise`\<`string` \| `null`\>

Defined in: [lib/undici/response.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L49)

读取所有内容为文本

#### Returns

`Promise`\<`string` \| `null`\>

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/undici/response.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L80)

用户自定义的 content 内容

#### Parameters

##### v

`string` \| `Buffer`\<`ArrayBufferLike`\>

内容值

#### Returns

`void`
