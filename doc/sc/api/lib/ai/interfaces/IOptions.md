[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/ai.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L54)

选项

## Properties

### endpoint?

> `optional` **endpoint?**: `string`

Defined in: [lib/ai.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L58)

接入点

***

### fetch?

> `optional` **fetch?**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L62)

自定义 fetch 函数

#### Parameters

##### input

`string` \| `Request` \| `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

***

### secretKey?

> `optional` **secretKey?**: `string`

Defined in: [lib/ai.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L60)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L56)

服务商 -

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ai.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L64)

请求超时，毫秒
