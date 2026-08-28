[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parserAsync

# Function: parserAsync()

## Call Signature

> **parserAsync**\<`TSchema`\>(`schema`): [`ParserAsync`](../interfaces/ParserAsync.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1800

Returns a function that parses an unknown input based on a schema.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The schema to be used.

### Returns

[`ParserAsync`](../interfaces/ParserAsync.md)\<`TSchema`, `undefined`\>

The parser function.

## Call Signature

> **parserAsync**\<`TSchema`, `TConfig`\>(`schema`, `config`): [`ParserAsync`](../interfaces/ParserAsync.md)\<`TSchema`, `TConfig`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1809

Returns a function that parses an unknown input based on a schema.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`ParserAsync`](../interfaces/ParserAsync.md)\<`TSchema`, `TConfig`\>

The parser function.
