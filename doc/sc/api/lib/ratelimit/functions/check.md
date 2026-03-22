[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / check

# Function: check()

> **check**(`kv`, `key`, `opt?`): `Promise`\<[`ICheckResult`](../interfaces/ICheckResult.md)\>

Defined in: [lib/ratelimit.ts:18](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L18)

检查指定 key 是否超速，使用多段近似滑动窗口算法

## Parameters

### kv

[`Kv`](../../kv/classes/Kv.md)

KV 实例

### key

`string`

限速标识（如 IP、用户 UID 等）

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

返回结果对象
