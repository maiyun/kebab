[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / returns

# Function: returns()

> **returns**\<`TInput$1`, `TSchema`\>(`schema`): [`ReturnsAction`](../interfaces/ReturnsAction.md)\<`TInput$1`, `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14065

Creates a function return transformation action.

## Type Parameters

### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The arguments schema.

## Returns

[`ReturnsAction`](../interfaces/ReturnsAction.md)\<`TInput$1`, `TSchema`\>

An returns action.
