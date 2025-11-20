[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/response](../index.md) / Response

# Class: Response

Defined in: [lib/net/response.ts:10](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L10)

## Constructors

### Constructor

> **new Response**(`req`): `Response`

Defined in: [lib/net/response.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L23)

#### Parameters

##### req

`IResponse` | `null`

#### Returns

`Response`

## Properties

### error

> **error**: `Error` \| `null` = `null`

Defined in: [lib/net/response.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L18)

***

### headers

> **headers**: [`THttpHeaders`](../../type-aliases/THttpHeaders.md) \| `null` = `null`

Defined in: [lib/net/response.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L16)

返回的 headers

## Methods

### getContent()

> **getContent**(): `Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

Defined in: [lib/net/response.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L30)

读取所有内容到内存

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\> \| `null`\>

***

### getRawStream()

> **getRawStream**(): `Readable` \| `null`

Defined in: [lib/net/response.ts:55](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L55)

获取原生响应读取流对象

#### Returns

`Readable` \| `null`

***

### getStream()

> **getStream**(): `Readable` \| `null`

Defined in: [lib/net/response.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L48)

获取响应读取流对象

#### Returns

`Readable` \| `null`

***

### setContent()

> **setContent**(`v`): `void`

Defined in: [lib/net/response.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/net/response.ts#L41)

用户自定义的 content 内容

#### Parameters

##### v

内容值

`string` | `Buffer`\<`ArrayBufferLike`\>

#### Returns

`void`
