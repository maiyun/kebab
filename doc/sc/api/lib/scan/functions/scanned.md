[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/scan](../index.md) / scanned

# Function: scanned()

> **scanned**(`link`, `token`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/scan.ts:259](https://github.com/maiyunnet/kebab/blob/master/lib/scan.ts#L259)

对 token 执行访问操作，通常用户扫码后展示的网页所调用，代表已扫码

## Parameters

### link

Db 或 Kv

[`Pool`](../../db/pool/classes/Pool.md) | [`Kv`](../../kv/classes/Kv.md)

### token

`string`

必填

### opt

[`IStaticOptions`](../interfaces/IStaticOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>
