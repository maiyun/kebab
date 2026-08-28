[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ParserAsync

# Interface: ParserAsync()\<TSchema, TConfig\>

Defined in: node\_modules/valibot/dist/index.d.mts:1779

The parser async interface.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TConfig

`TConfig` *extends* [`Config`](Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\> \| `undefined`

> **ParserAsync**(`input`): `Promise`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:1783

Parses an unknown input based on the schema.

## Parameters

### input

`unknown`

## Returns

`Promise`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>

## Properties

### config

> `readonly` **config**: `TConfig`

Defined in: node\_modules/valibot/dist/index.d.mts:1791

The parser configuration.

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:1787

The schema to be used.
