[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / partialAsync

# Function: partialAsync()

## Call Signature

> **partialAsync**\<`TSchema`\>(`schema`): [`SchemaWithPartialAsync`](../type-aliases/SchemaWithPartialAsync.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2095

Creates a modified copy of an object schema that marks all entries as optional.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$7`

### Parameters

#### schema

`TSchema`

The schema to modify.

### Returns

[`SchemaWithPartialAsync`](../type-aliases/SchemaWithPartialAsync.md)\<`TSchema`, `undefined`\>

An object schema.

## Call Signature

> **partialAsync**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithPartialAsync`](../type-aliases/SchemaWithPartialAsync.md)\<`TSchema`, `TKeys`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2105

Creates a modified copy of an object schema that marks the selected entries
as optional.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$7`

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

[`SchemaWithPartialAsync`](../type-aliases/SchemaWithPartialAsync.md)\<`TSchema`, `TKeys`\>

An object schema.
