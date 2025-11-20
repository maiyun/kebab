[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / Vector

# Class: Vector

Defined in: [lib/vector.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L31)

## Constructors

### Constructor

> **new Vector**(`etc`): `Vector`

Defined in: [lib/vector.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L36)

#### Parameters

##### etc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md)

#### Returns

`Vector`

## Methods

### delete()

> **delete**(`data`): `Promise`\<`false` \| `MutationResult`\>

Defined in: [lib/vector.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L104)

删除数据

#### Parameters

##### data

###### collection

`string`

表名

###### filter

`string`

过滤器，如 word_count > 0 and book_id in [1, 2, 3]

#### Returns

`Promise`\<`false` \| `MutationResult`\>

***

### insert()

> **insert**(`data`): `Promise`\<`false` \| `MutationResult`\>

Defined in: [lib/vector.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L79)

插入数据

#### Parameters

##### data

###### collection

`string`

表名

###### data

`RowData`[]

要插入的数据

#### Returns

`Promise`\<`false` \| `MutationResult`\>

***

### seach()

> **seach**(`data`): `Promise`\<`false` \| `SearchResults`\<\{ `collection_name`: `string`; `data`: `number`[]; `filter`: `string` \| `undefined`; `limit`: `number`; `metric_type`: `"L2"` \| `"IP"` \| `"COSINE"`; `output_fields`: `string`[] \| `undefined`; \}\>\>

Defined in: [lib/vector.ts:42](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L42)

搜索

#### Parameters

##### data

###### collection

`string`

表名

###### data

`number`[]

查询的向量

###### fields?

`string`[]

输出的字段，如 ['book_id', 'word_count']，默认全部

###### filter?

`string`

过滤器，如 word_count > 0 and book_id in [1, 2, 3]

###### limit?

`number`

返回的结果数量，默认为 3

###### metric?

`"L2"` \| `"IP"` \| `"COSINE"`

计算两个向量相似度的度量，默认 L2

#### Returns

`Promise`\<`false` \| `SearchResults`\<\{ `collection_name`: `string`; `data`: `number`[]; `filter`: `string` \| `undefined`; `limit`: `number`; `metric_type`: `"L2"` \| `"IP"` \| `"COSINE"`; `output_fields`: `string`[] \| `undefined`; \}\>\>
