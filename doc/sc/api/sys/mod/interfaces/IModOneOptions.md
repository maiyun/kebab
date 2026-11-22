[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / IModOneOptions

# Interface: IModOneOptions

Defined in: [sys/mod.ts:23](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L23)

按条件查询单条记录的选项

## Properties

### by?

> `optional` **by?**: \[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

Defined in: [sys/mod.ts:31](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L31)

***

### ctr?

> `optional` **ctr?**: [`Ctr`](../../ctr/classes/Ctr.md)

Defined in: [sys/mod.ts:24](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L24)

***

### hint?

> `optional` **hint?**: `string`

Defined in: [sys/mod.ts:32](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L32)

***

### index?

> `optional` **index?**: `string` \| `string`[]

Defined in: [sys/mod.ts:29](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L29)

***

### lock?

> `optional` **lock?**: `boolean`

Defined in: [sys/mod.ts:26](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L26)

加锁时确保 WHERE 条件命中索引，以免锁定过多记录

***

### pre?

> `optional` **pre?**: `string`

Defined in: [sys/mod.ts:28](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L28)

MySQL 表前缀或 PostgreSQL Schema 名

***

### select?

> `optional` **select?**: `string` \| `string`[]

Defined in: [sys/mod.ts:30](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L30)
