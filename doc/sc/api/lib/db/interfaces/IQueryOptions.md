[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / IQueryOptions

# Interface: IQueryOptions

Defined in: [lib/db.ts:63](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L63)

query 查询选项

## Properties

### read?

> `optional` **read?**: `boolean`

Defined in: [lib/db.ts:65](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L65)

是否优先使用只读从库，默认 false（走主库）；未配置从库时自动走主库
