[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / partial

# Function: partial()

## Call Signature

> **partial**\<`TSchema`\>(`schema`): [`SchemaWithPartial`](../type-aliases/SchemaWithPartial.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1947

Creates a modified copy of an object schema that marks all entries as optional.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$8`

### Parameters

#### schema

`TSchema`

The schema to modify.

### Returns

[`SchemaWithPartial`](../type-aliases/SchemaWithPartial.md)\<`TSchema`, `undefined`\>

An object schema.

## Call Signature

> **partial**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithPartial`](../type-aliases/SchemaWithPartial.md)\<`TSchema`, `TKeys`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1957

Creates a modified copy of an object schema that marks the selected entries
as optional.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$8`

#### TKeys

`TKeys` *extends* [`ObjectKeys`](../type-aliases/ObjectKeys.md)\<`TSchema`\>

### Parameters

#### schema

`TSchema`

The schema to modify.

#### keys

`TKeys`

The selected entries.

### Returns

[`SchemaWithPartial`](../type-aliases/SchemaWithPartial.md)\<`TSchema`, `TKeys`\>

An object schema.
