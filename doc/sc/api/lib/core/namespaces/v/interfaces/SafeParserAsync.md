[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SafeParserAsync

# Interface: SafeParserAsync()\<TSchema, TConfig\>

Defined in: node\_modules/valibot/dist/index.d.mts:2816

The safe parser async interface.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TConfig

`TConfig` *extends* [`Config`](Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\> \| `undefined`

> **SafeParserAsync**(`input`): `Promise`\<[`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:2820

Parses an unknown input based on the schema.

## Parameters

### input

`unknown`

## Returns

`Promise`\<[`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>\>

## Properties

### config

> `readonly` **config**: `TConfig`

Defined in: node\_modules/valibot/dist/index.d.mts:2828

The parser configuration.

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:2824

The schema to be used.
