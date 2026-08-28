[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithFallback

# Type Alias: SchemaWithFallback\<TSchema, TFallback$1\>

> **SchemaWithFallback**\<`TSchema`, `TFallback$1`\> = `TSchema` & `object`

Defined in: node\_modules/valibot/dist/index.d.mts:194

Schema with fallback type.

## Type Declaration

### fallback

> `readonly` **fallback**: `TFallback$1`

The fallback value.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TFallback$1

`TFallback$1` *extends* [`Fallback`](Fallback.md)\<`TSchema`\>
