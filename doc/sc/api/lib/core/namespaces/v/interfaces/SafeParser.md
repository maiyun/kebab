[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SafeParser

# Interface: SafeParser()\<TSchema, TConfig\>

Defined in: node\_modules/valibot/dist/index.d.mts:2780

The safe parser interface.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TConfig

`TConfig` *extends* [`Config`](Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\> \| `undefined`

> **SafeParser**(`input`): [`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2784

Parses an unknown input based on the schema.

## Parameters

### input

`unknown`

## Returns

[`SafeParseResult`](../type-aliases/SafeParseResult.md)\<`TSchema`\>

## Properties

### config

> `readonly` **config**: `TConfig`

Defined in: node\_modules/valibot/dist/index.d.mts:2792

The parser configuration.

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:2788

The schema to be used.
