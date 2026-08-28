[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / fallback

# Function: fallback()

> **fallback**\<`TSchema`, `TFallback$1`\>(`schema`, `fallback`): [`SchemaWithFallback`](../type-aliases/SchemaWithFallback.md)\<`TSchema`, `TFallback$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:208

Returns a fallback value as output if the input does not match the schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TFallback$1

`TFallback$1` *extends* `unknown`

## Parameters

### schema

`TSchema`

The schema to catch.

### fallback

`TFallback$1`

The fallback value.

## Returns

[`SchemaWithFallback`](../type-aliases/SchemaWithFallback.md)\<`TSchema`, `TFallback$1`\>

The passed schema.
