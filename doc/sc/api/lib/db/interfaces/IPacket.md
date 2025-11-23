[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/db](../index.md) / IPacket

# Interface: IPacket

Defined in: [lib/db.ts:40](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L40)

exec 返回对象

## Properties

### error

> **error**: \{\[`key`: `string`\]: `any`; `errno`: `number`; `message`: `string`; \} \| `null`

Defined in: [lib/db.ts:53](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L53)

***

### fields

> **fields**: `object`[]

Defined in: [lib/db.ts:47](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L47)

#### length

> **length**: `number`

字段格式长度

#### name

> **name**: `string`

字段名

***

### packet

> **packet**: \{ `affected`: `number`; `insert`: `number`; \} \| `null`

Defined in: [lib/db.ts:41](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L41)

#### Type Declaration

\{ `affected`: `number`; `insert`: `number`; \}

#### affected

> **affected**: `number`

受影响的行数

#### insert

> **insert**: `number`

插入的 id

`null`

***

### result

> **result**: `number`

Defined in: [lib/db.ts:59](https://github.com/maiyunnet/kebab/blob/master/lib/db.ts#L59)

1-正常,-500-服务器错误
