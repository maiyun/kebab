[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / checkFixed

# Function: checkFixed()

> **checkFixed**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L77)

简易固定窗口限速检查（性能更高，精度较低）

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识

### opt?

限速选项

#### max?

`number`

窗口内最大请求数，默认 60

#### pre?

`string`

key 前缀，默认 rl:

#### window?

`number`

窗口时间（秒），默认 60

## Returns

`Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>
