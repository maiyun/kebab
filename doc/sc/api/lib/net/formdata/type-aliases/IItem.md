[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/net/formdata](../index.md) / IItem

# Type Alias: IItem

> **IItem** = \{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \} \| \{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

Defined in: [lib/net/formdata.ts:12](https://github.com/maiyunnet/kebab/blob/master/lib/net/formdata.ts#L12)

Item 对象

## Type Declaration

\{ `key`: `string`; `path`: `""`; `type`: `"string"`; `value`: `string`; \}

### key

> **key**: `string`

key 键

### path

> **path**: `""`

### type

> **type**: `"string"`

### value

> **value**: `string`

字符串值

\{ `key`: `string`; `path`: `string`; `type`: `"file"`; `value`: `string`; \}

### key

> **key**: `string`

key 键

### path

> **path**: `string`

文件路径

### type

> **type**: `"file"`

### value

> **value**: `string`

文件名

\{ `key`: `string`; `path`: `Buffer`; `type`: `"buffer"`; `value`: `string`; \}

### key

> **key**: `string`

key 键

### path

> **path**: `Buffer`

Buffer 数据

### type

> **type**: `"buffer"`

### value

> **value**: `string`

文件名
