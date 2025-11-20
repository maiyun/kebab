[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / setData

# Function: setData()

> **setData**(`link`, `token`, `data`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:313](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L313)

将数据写入 token，通常在客户的逻辑下去写，服务器会 poll 到

## Parameters

### link

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

### token

`string`

### data

`string` | `number` | `Record`\<`string`, `any`\>

### opt

[`IStaticOptions`](../interfaces/IStaticOptions.md) = `{}`

## Returns

`Promise`\<`boolean`\>
