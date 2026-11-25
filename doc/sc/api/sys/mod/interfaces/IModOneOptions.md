[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / IModOneOptions

# Interface: IModOneOptions

Defined in: [sys/mod.ts:23](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L23)

按条件查询单条记录的选项

## Properties

### by?

> `optional` **by?**: \[`string` \| `string`[], `"DESC"` \| `"ASC"`\]

Defined in: [sys/mod.ts:35](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L35)

排序字段与方向

***

### ctr?

> `optional` **ctr?**: [`Ctr`](../../ctr/classes/Ctr.md)

Defined in: [sys/mod.ts:25](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L25)

所属控制器，用于错误日志

***

### hint?

> `optional` **hint?**: `string`

Defined in: [sys/mod.ts:37](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L37)

SQL 优化提示

***

### index?

> `optional` **index?**: `string` \| `string`[]

Defined in: [sys/mod.ts:31](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L31)

分表后缀

***

### lock?

> `optional` **lock?**: `boolean`

Defined in: [sys/mod.ts:27](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L27)

加锁时确保 WHERE 条件命中索引，以免锁定过多记录

***

### pre?

> `optional` **pre?**: `string`

Defined in: [sys/mod.ts:29](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L29)

MySQL 表前缀或 PostgreSQL Schema 名

***

### select?

> `optional` **select?**: `string` \| `string`[]

Defined in: [sys/mod.ts:33](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L33)

指定查询字段
