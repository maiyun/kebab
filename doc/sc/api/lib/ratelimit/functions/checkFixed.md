[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / checkFixed

# Function: checkFixed()

> **checkFixed**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L27)

检查指定 key 是否超出固定窗口限额，窗口从首次请求开始且超限请求同样计入次数

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识

### opt?

[`ICheckOptions`](../interfaces/ICheckOptions.md) = `{}`

限速选项

## Returns

`Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

检查结果；后续请求沿用首次请求设置的过期时间，Redis 无法检查时默认放行并标记 unavailable，failClosed 为 true 时拒绝
