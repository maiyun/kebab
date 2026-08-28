[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / safeParse

# Function: safeParse()

> **safeParse**\<`TSchema`\>(`schema`, `input`, `config?`): [`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2762

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

[`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>

The parse result.
