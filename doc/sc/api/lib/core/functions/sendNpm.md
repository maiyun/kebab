[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendNpm

# Function: sendNpm()

> **sendNpm**(`path`, `hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:683](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L683)

向本机或局域网 RPC 发送 npm install 操作

## Parameters

### path

`string`

路径，如 /home/kebab/

### hosts?

`string`[] \| `"config"`

局域网列表，不填则代表本机

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>
