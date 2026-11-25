[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / ICheckResult

# Interface: ICheckResult

Defined in: [lib/ratelimit.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L46)

限速检查结果

## Properties

### allowed

> **allowed**: `boolean`

Defined in: [lib/ratelimit.ts:48](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L48)

是否允许通过

***

### limit

> **limit**: `number`

Defined in: [lib/ratelimit.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L52)

总限额

***

### remaining

> **remaining**: `number`

Defined in: [lib/ratelimit.ts:50](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L50)

当前剩余可用次数

***

### reset

> **reset**: `number`

Defined in: [lib/ratelimit.ts:54](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L54)

预计恢复额度的 Unix 秒，滑动窗口按此后没有新请求估算

***

### unavailable?

> `optional` **unavailable?**: `true`

Defined in: [lib/ratelimit.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L56)

Redis 无法检查限额时为 true
