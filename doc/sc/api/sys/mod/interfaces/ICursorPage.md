[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / ICursorPage

# Interface: ICursorPage\<T\>

Defined in: [sys/mod.ts:41](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L41)

一批游标查询结果，hasMore 表示扫描方向上还有记录

## Type Parameters

### T

`T` *extends* `object` = `Record`\<`string`, `unknown`\>

## Properties

### hasMore

> **hasMore**: `boolean`

Defined in: [sys/mod.ts:43](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L43)

***

### list

> **list**: `T`[]

Defined in: [sys/mod.ts:42](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L42)

***

### next

> **next**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:44](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L44)

***

### previous

> **previous**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:45](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L45)
