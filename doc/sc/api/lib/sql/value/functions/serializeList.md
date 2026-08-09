[**Documents for @maiyunnet/kebab**](../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../index.md) / [lib/sql/value](../index.md) / serializeList

# Function: serializeList()

> **serializeList**(`values?`): [`DbValue`](../../../../index/type-aliases/DbValue.md)[] \| `undefined`

Defined in: [lib/sql/value.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/sql/value.ts#L62)

在进入数据库驱动前序列化特殊参数，不修改调用方数组

## Parameters

### values?

[`DbValue`](../../../../index/type-aliases/DbValue.md)[]

SQL 参数列表

## Returns

[`DbValue`](../../../../index/type-aliases/DbValue.md)[] \| `undefined`

可直接交给数据库驱动的参数列表
