[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parseAsync

# Function: parseAsync()

> **parseAsync**\<`TSchema`\>(`schema`, `input`, `config?`): `Promise`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:1737

Parses an unknown input based on a schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The schema to be used.

### input

`unknown`

The input to be parsed.

### config?

[`Config`](../interfaces/Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\>

The parse configuration.

## Returns

`Promise`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>

The parsed input.
