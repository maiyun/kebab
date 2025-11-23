[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / IData

# Interface: IData

Defined in: [lib/db.ts:23](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L23)

query 返回的数据

## Properties

### error

> **error**: \{ `errno`: `number`; `message`: `string`; \} \| `null`

Defined in: [lib/db.ts:31](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L31)

***

### fields

> **fields**: `object`[]

Defined in: [lib/db.ts:25](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L25)

#### length

> **length**: `number`

字段格式长度

#### name

> **name**: `string`

字段名

***

### result

> **result**: `number`

Defined in: [lib/db.ts:36](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L36)

1-正常,-500-服务器错误

***

### rows

> **rows**: `Record`\<`string`, `any`\>[] \| `null`

Defined in: [lib/db.ts:24](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L24)
