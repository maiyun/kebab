[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / Vector

# Class: Vector

Defined in: [lib/vector.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L25)

## Constructors

### Constructor

> **new Vector**(`etc`): `Vector`

Defined in: [lib/vector.ts:30](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L30)

#### Parameters

##### etc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md)

#### Returns

`Vector`

## Methods

### delete()

> **delete**(`data`): `Promise`\<`false` \| \{ `deletedCount`: `number`; \}\>

Defined in: [lib/vector.ts:120](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L120)

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

`Promise`\<`false` \| \{ `deletedCount`: `number`; \}\>

***

### insert()

> **insert**(`data`): `Promise`\<`false` \| \{ `insertCount`: `number`; `insertIds`: (`string` \| `number`)[]; \}\>

Defined in: [lib/vector.ts:89](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L89)

插入数据

#### Parameters

##### data

###### collection

`string`

表名

###### data

`Record`\<`string`, `any`\>[]

要插入的数据

#### Returns

`Promise`\<`false` \| \{ `insertCount`: `number`; `insertIds`: (`string` \| `number`)[]; \}\>

***

### search()

> **search**(`data`): `Promise`\<`false` \| `object`[]\>

Defined in: [lib/vector.ts:35](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L35)

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

`Promise`\<`false` \| `object`[]\>
