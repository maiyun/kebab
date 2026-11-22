[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / ISearchOptions

# Interface: ISearchOptions

Defined in: [lib/vector.ts:26](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L26)

向量搜索参数

## Properties

### collection

> **collection**: `string`

Defined in: [lib/vector.ts:28](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L28)

表名

***

### data

> **data**: `number`[]

Defined in: [lib/vector.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L30)

查询的向量

***

### fields?

> `optional` **fields?**: `string`[]

Defined in: [lib/vector.ts:38](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L38)

输出的字段，如 ['book_id', 'word_count']，默认全部

***

### filter?

> `optional` **filter?**: `string`

Defined in: [lib/vector.ts:32](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L32)

过滤器，如 word_count > 0 and book_id in [1, 2, 3]

***

### limit?

> `optional` **limit?**: `number`

Defined in: [lib/vector.ts:34](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L34)

返回的结果数量，默认为 3

***

### metric?

> `optional` **metric?**: `"L2"` \| `"IP"` \| `"COSINE"`

Defined in: [lib/vector.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L36)

计算两个向量相似度的度量，默认 L2
