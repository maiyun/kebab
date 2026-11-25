[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZRangeOptions

# Interface: IZRangeOptions

Defined in: [lib/kv.ts:1444](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1444)

ZRANGE 查询选项

## Properties

### by?

> `optional` **by?**: `"SCORE"` \| `"LEX"`

Defined in: [lib/kv.ts:1446](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1446)

查询方式：SCORE 按分数范围，LEX 按字典序

***

### count?

> `optional` **count?**: `number`

Defined in: [lib/kv.ts:1452](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1452)

分页条数，需与 offset 同用

***

### offset?

> `optional` **offset?**: `number`

Defined in: [lib/kv.ts:1450](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1450)

分页偏移量，需与 count 同用

***

### rev?

> `optional` **rev?**: `boolean`

Defined in: [lib/kv.ts:1448](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1448)

是否倒序返回
