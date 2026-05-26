[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / removeGlobal

# Function: removeGlobal()

> **removeGlobal**(`key`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:787](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L787)

移除某个跨线程/跨内网服务器全局变量

## Parameters

### key

`string`

变量名

### hosts?

`string`[] \| `"config"`

局域网列表

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>
