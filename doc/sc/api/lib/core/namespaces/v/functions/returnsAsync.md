[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / returnsAsync

# Function: returnsAsync()

> **returnsAsync**\<`TInput$1`, `TSchema`\>(`schema`): [`ReturnsActionAsync`](../interfaces/ReturnsActionAsync.md)\<`TInput$1`, `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14434

Creates a function arguments transformation action.

## Type Parameters

### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The arguments schema.

## Returns

[`ReturnsActionAsync`](../interfaces/ReturnsActionAsync.md)\<`TInput$1`, `TSchema`\>

An returns action.
