[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/vector](../index.md) / Vector

# Class: Vector

Defined in: [lib/vector.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L47)

## Constructors

### Constructor

> **new Vector**(`etc`): `Vector`

Defined in: [lib/vector.ts:52](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L52)

#### Parameters

##### etc

[`IConfigVector`](../../../index/interfaces/IConfigVector.md)

#### Returns

`Vector`

## Methods

### delete()

> **delete**(`data`): `Promise`\<`false` \| \{ `deletedCount`: `number`; \}\>

Defined in: [lib/vector.ts:139](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L139)

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

Defined in: [lib/vector.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L108)

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

#### Call Signature

> **search**(`data`): `Promise`\<`false` \| ([`ISearchHit`](../interfaces/ISearchHit.md) & `Record`\<`string`, `any`\>)[]\>

Defined in: [lib/vector.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L61)

搜索相近向量，允许动态访问输出字段

##### Parameters

###### data

[`ISearchOptions`](../interfaces/ISearchOptions.md)

查询向量及搜索选项

##### Returns

`Promise`\<`false` \| ([`ISearchHit`](../interfaces/ISearchHit.md) & `Record`\<`string`, `any`\>)[]\>

搜索命中列表，搜索失败时返回 false

#### Call Signature

> **search**\<`TExtra`\>(`data`): `Promise`\<`false` \| ([`ISearchHit`](../interfaces/ISearchHit.md) & `Omit`\<`TExtra`, keyof [`ISearchHit`](../interfaces/ISearchHit.md)\>)[]\>

Defined in: [lib/vector.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/vector.ts#L68)

搜索相近向量，按指定类型返回额外字段

##### Type Parameters

###### TExtra

`TExtra` *extends* `object`

由调用方根据输出字段指定的结构，id 和 distance 保持固定类型

##### Parameters

###### data

[`ISearchOptions`](../interfaces/ISearchOptions.md)

查询向量及搜索选项

##### Returns

`Promise`\<`false` \| ([`ISearchHit`](../interfaces/ISearchHit.md) & `Omit`\<`TExtra`, keyof [`ISearchHit`](../interfaces/ISearchHit.md)\>)[]\>

搜索命中列表，搜索失败时返回 false
