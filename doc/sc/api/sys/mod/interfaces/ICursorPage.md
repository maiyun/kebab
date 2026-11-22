[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / ICursorPage

# Interface: ICursorPage\<T\>

Defined in: [sys/mod.ts:36](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L36)

一批游标查询结果，hasMore 表示扫描方向上还有记录

## Type Parameters

### T

`T` *extends* `object` = `Record`\<`string`, `unknown`\>

## Properties

### hasMore

> **hasMore**: `boolean`

Defined in: [sys/mod.ts:38](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L38)

***

### list

> **list**: `T`[]

Defined in: [sys/mod.ts:37](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L37)

***

### next

> **next**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:39](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L39)

***

### previous

> **previous**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:40](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L40)
