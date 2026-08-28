[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getDefault

# Function: getDefault()

> **getDefault**\<`TSchema`\>(`schema`, `dataset?`, `config?`): [`InferDefault`](../type-aliases/InferDefault.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:368

Returns the default value of the schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The schema to get it from.

### dataset?

[`UnknownDataset`](../interfaces/UnknownDataset.md)

The input dataset if available.

### config?

[`Config`](../interfaces/Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\>

The config if available.

## Returns

[`InferDefault`](../type-aliases/InferDefault.md)\<`TSchema`\>

The default value.
