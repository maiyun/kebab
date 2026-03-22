[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / ICheckResult

# Interface: ICheckResult

Defined in: [lib/ratelimit.ts:117](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L117)

限速检查结果

## Properties

### allowed

> **allowed**: `boolean`

Defined in: [lib/ratelimit.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L119)

是否允许通过

***

### limit

> **limit**: `number`

Defined in: [lib/ratelimit.ts:123](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L123)

总限额

***

### remaining

> **remaining**: `number`

Defined in: [lib/ratelimit.ts:121](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L121)

剩余可用次数

***

### reset

> **reset**: `number`

Defined in: [lib/ratelimit.ts:125](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L125)

窗口重置时间（Unix 时间戳秒）
