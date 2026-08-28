[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parser

# Function: parser()

## Call Signature

> **parser**\<`TSchema`\>(`schema`): [`Parser`](../interfaces/Parser.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1764

Returns a function that parses an unknown input based on a schema.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The schema to be used.

### Returns

[`Parser`](../interfaces/Parser.md)\<`TSchema`, `undefined`\>

The parser function.

## Call Signature

> **parser**\<`TSchema`, `TConfig`\>(`schema`, `config`): [`Parser`](../interfaces/Parser.md)\<`TSchema`, `TConfig`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1773

Returns a function that parses an unknown input based on a schema.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TConfig

`TConfig` *extends* [`Config`](../interfaces/Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\> \| `undefined`

### Parameters

#### schema

`TSchema`

The schema to be used.

#### config

`TConfig`

The parser configuration.

### Returns

[`Parser`](../interfaces/Parser.md)\<`TSchema`, `TConfig`\>

The parser function.
