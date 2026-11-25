[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/kv](../index.md) / IZRangeOptions

# Interface: IZRangeOptions

Defined in: [lib/kv.ts:1388](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1388)

ZRANGE 查询选项

## Properties

### by?

> `optional` **by?**: `"SCORE"` \| `"LEX"`

Defined in: [lib/kv.ts:1390](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1390)

查询方式：SCORE 按分数范围，LEX 按字典序

***

### count?

> `optional` **count?**: `number`

Defined in: [lib/kv.ts:1396](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1396)

分页条数，需与 offset 同用

***

### offset?

> `optional` **offset?**: `number`

Defined in: [lib/kv.ts:1394](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1394)

分页偏移量，需与 count 同用

***

### rev?

> `optional` **rev?**: `boolean`

Defined in: [lib/kv.ts:1392](https://github.com/maiyunnet/kebab/blob/master/lib/kv.ts#L1392)

是否倒序返回
