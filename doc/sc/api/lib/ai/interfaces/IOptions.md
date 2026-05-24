[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ai](../index.md) / IOptions

# Interface: IOptions

Defined in: [lib/ai.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L50)

选项

## Properties

### endpoint?

> `optional` **endpoint?**: `string`

Defined in: [lib/ai.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L54)

接入点

***

### fetch?

> `optional` **fetch?**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [lib/ai.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L58)

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

Defined in: [lib/ai.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L56)

密钥

***

### service

> **service**: [`ESERVICE`](../enumerations/ESERVICE.md)

Defined in: [lib/ai.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/ai.ts#L52)

服务商 -
