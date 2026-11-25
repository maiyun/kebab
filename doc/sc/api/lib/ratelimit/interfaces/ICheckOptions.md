[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ratelimit](../index.md) / ICheckOptions

# Interface: ICheckOptions

Defined in: [lib/ratelimit.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L34)

限速检查选项

## Properties

### failClosed?

> `optional` **failClosed?**: `boolean`

Defined in: [lib/ratelimit.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L42)

Redis 无法检查时是否拒绝请求，默认 false（放行）

***

### max?

> `optional` **max?**: `number`

Defined in: [lib/ratelimit.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L38)

窗口内最大请求数，默认 60

***

### pre?

> `optional` **pre?**: `string`

Defined in: [lib/ratelimit.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L40)

key 前缀，默认 rl:

***

### window?

> `optional` **window?**: `number`

Defined in: [lib/ratelimit.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/ratelimit.ts#L36)

窗口时间（秒），默认 60
