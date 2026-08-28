[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / lazy

# Function: lazy()

> **lazy**\<`TWrapped$1`\>(`getter`): [`LazySchema`](../interfaces/LazySchema.md)\<`TWrapped$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4707

Creates a lazy schema.

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### getter

(`input`) => `TWrapped$1`

The schema getter.

## Returns

[`LazySchema`](../interfaces/LazySchema.md)\<`TWrapped$1`\>

A lazy schema.
