[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/ai.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L41)

选项

## Properties

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/ai.ts:45](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L45)

接入点

***

### fetch()?

> `optional` **fetch**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:49](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L49)

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

Defined in: [lib/ai.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L47)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:43](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L43)

服务商 -
