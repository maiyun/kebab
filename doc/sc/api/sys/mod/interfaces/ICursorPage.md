[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/mod](../index.md) / ICursorPage

# Interface: ICursorPage\<T\>

Defined in: [sys/mod.ts:20](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L20)

一批游标查询结果，hasMore 表示扫描方向上还有记录

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `unknown`\> = `Record`\<`string`, `unknown`\>

## Properties

### hasMore

> **hasMore**: `boolean`

Defined in: [sys/mod.ts:22](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L22)

***

### list

> **list**: `T`[]

Defined in: [sys/mod.ts:21](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L21)

***

### next

> **next**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:23](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L23)

***

### previous

> **previous**: [`TCursorValue`](../../../lib/sql/type-aliases/TCursorValue.md)[] \| `null`

Defined in: [sys/mod.ts:24](https://github.com/maiyunnet/kebab/blob/master/sys/mod.ts#L24)
