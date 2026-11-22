[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/undici/response](../index.md) / Response

# Class: Response

Defined in: [lib/undici/response.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L14)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/undici/response.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L27)

#### Parameters

##### req

`ResponseData`\<`null`\> \| `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/undici/response.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L22)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/undici/response.ts:20](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L20)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/undici/response.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L34)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getJson()

#### Call Signature

> **getJson**(): `Promise`\<`any`\>

Defined in: [lib/undici/response.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L71)

读取并解析 JSON 响应

##### Returns

`Promise`\<`any`\>

解析结果，响应为空或读取失败返回 null，JSON 解析失败返回 false

#### Call Signature

> **getJson**\<`T`\>(): `Promise`\<`false` \| `T` \| `null`\>

Defined in: [lib/undici/response.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L77)

读取并解析 JSON 响应

##### Type Parameters

###### T

`T`

预期的响应类型，解析时只检查 JSON 语法

##### Returns

`Promise`\<`false` \| `T` \| `null`\>

解析结果，响应为空或读取失败返回 null，JSON 解析失败返回 false

***

### getRawStream()

> **getRawStream**(): `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:138](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L138)

获取原生响应读取流对象

#### Returns

`BodyReadable` & `BodyMixin` \| `null`

***

### getStream()

> **getStream**(): `BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

Defined in: [lib/undici/response.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L103)

获取响应读取流对象

#### Returns

`BrotliDecompress` \| `Gunzip` \| `Inflate` \| `BodyReadable` & `BodyMixin` \| `null`

***

### getText()

> **getText**(): `Promise`\<`string` \| `null`\>

Defined in: [lib/undici/response.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L53)

读取所有内容为文本

#### Returns

`Promise`\<`string` \| `null`\>

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/undici/response.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/undici/response.ts#L96)

用户自定义的 content 内容

#### Parameters

##### v

`string` \| `Buffer`\<`ArrayBufferLike`\>

内容值

#### Returns

`void`
