[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZRangeOptions

# Interface: IZRangeOptions

Defined in: [lib/kv.ts:15](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L15)

## Properties

### by?

> `optional` **by**: `"SCORE"` \| `"LEX"`

Defined in: [lib/kv.ts:22](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L22)

Range query type.

- SCORE: Query by score range
- LEX: Query by lexicographical range

***

### count?

> `optional` **count**: `number`

Defined in: [lib/kv.ts:37](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L37)

Pagination count. Must be used together with offset.

***

### offset?

> `optional` **offset**: `number`

Defined in: [lib/kv.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L32)

Pagination offset. Must be used together with count.

***

### rev?

> `optional` **rev**: `boolean`

Defined in: [lib/kv.ts:27](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L27)

Whether to return results in reverse order.
