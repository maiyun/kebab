[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / omit

# Function: omit()

> **omit**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithOmit`](../type-aliases/SchemaWithOmit.md)\<`TSchema`, `TKeys`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1713

Creates a modified copy of an object schema that does not contain the
selected entries.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$9`

### TKeys

`TKeys` *extends* [`ObjectKeys`](../type-aliases/ObjectKeys.md)\<`TSchema`\>

## Parameters

### schema

`TSchema`

The schema to omit from.

### keys

`TKeys`

The selected entries.

## Returns

[`SchemaWithOmit`](../type-aliases/SchemaWithOmit.md)\<`TSchema`, `TKeys`\>

An object schema.
