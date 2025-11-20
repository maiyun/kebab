[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/ai.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L32)

选项

## Properties

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/ai.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L36)

接入点

***

### fetch()?

> `optional` **fetch**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L40)

自定义 fetch 函数

#### Parameters

##### input

`string` | `Request` | `URL`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

***

### secretKey?

> `optional` **secretKey**: `string`

Defined in: [lib/ai.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L38)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L34)

服务商 -
