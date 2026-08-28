[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / lazyAsync

# Function: lazyAsync()

> **lazyAsync**\<`TWrapped$1`\>(`getter`): [`LazySchemaAsync`](../interfaces/LazySchemaAsync.md)\<`TWrapped$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4738

Creates a lazy schema.

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### getter

(`input`) => `MaybePromise`\<`TWrapped$1`\>

The schema getter.

## Returns

[`LazySchemaAsync`](../interfaces/LazySchemaAsync.md)\<`TWrapped$1`\>

A lazy schema.
