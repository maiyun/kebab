[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parse

# Function: parse()

> **parse**\<`TSchema`\>(`schema`, `input`, `config?`): [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1725

Parses an unknown input based on a schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

The parsed input.
