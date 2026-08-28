[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getFallback

# Function: getFallback()

> **getFallback**\<`TSchema`\>(`schema`, `dataset?`, `config?`): [`InferFallback`](../type-aliases/InferFallback.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:464

Returns the fallback value of the schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The schema to get it from.

### dataset?

[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\>

The output dataset if available.

### config?

[`Config`](../interfaces/Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\>

The config if available.

## Returns

[`InferFallback`](../type-aliases/InferFallback.md)\<`TSchema`\>

The fallback value.
