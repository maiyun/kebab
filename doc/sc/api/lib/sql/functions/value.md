[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/sql](../index.md) / value

# Function: value()

> **value**(`val`): `object`

Defined in: [lib/sql.ts:1416](https://github.com/maiyunnet/kebab/blob/master/lib/sql.ts#L1416)

创建字面量值对象，用于 where 条件中 v[0] 需要是值而非字段名的场景
例：[value('hello'), 'IN', column('tags')]

## Parameters

### val

[`DbValue`](../../../index/type-aliases/DbValue.md)

## Returns

`object`

### token

> **token**: `string`

### type

> **type**: `"value"`

### value

> **value**: [`DbValue`](../../../index/type-aliases/DbValue.md)
