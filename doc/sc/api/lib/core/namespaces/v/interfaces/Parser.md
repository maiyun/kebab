[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / Parser

# Interface: Parser()\<TSchema, TConfig\>

Defined in: node\_modules/valibot/dist/index.d.mts:1743

The parser interface.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TConfig

`TConfig` *extends* [`Config`](Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\> \| `undefined`

> **Parser**(`input`): [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1747

Parses an unknown input based on the schema.

## Parameters

### input

`unknown`

## Returns

[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

## Properties

### config

> `readonly` **config**: `TConfig`

Defined in: node\_modules/valibot/dist/index.d.mts:1755

The parser configuration.

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:1751

The schema to be used.
