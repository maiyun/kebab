[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / check

# Function: check()

> **check**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:16](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L16)

检查指定 key 是否超出近似滑动窗口限额，超限请求同样计入次数

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识（如 IP、用户 UID 等）

### opt?

[`ICheckOptions`](../interfaces/ICheckOptions.md) = `{}`

限速选项

## Returns

`Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

检查结果；窗口开头最多多计一个时间段，Redis 无法检查时默认放行并标记 unavailable，failClosed 为 true 时拒绝
