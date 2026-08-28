[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / pick

# Function: pick()

> **pick**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithPick`](../type-aliases/SchemaWithPick.md)\<`TSchema`, `TKeys`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2381

Creates a modified copy of an object schema that contains only the selected
entries.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$6`

### TKeys

`TKeys` *extends* [`ObjectKeys`](../type-aliases/ObjectKeys.md)\<`TSchema`\>

## Parameters

### schema

`TSchema`

The schema to pick from.

### keys

`TKeys`

The selected entries.

## Returns

[`SchemaWithPick`](../type-aliases/SchemaWithPick.md)\<`TSchema`, `TKeys`\>

An object schema.
