[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / requiredAsync

# Function: requiredAsync()

## Call Signature

> **requiredAsync**\<`TSchema`\>(`schema`): [`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `undefined`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2687

Creates a modified copy of an object schema that marks all entries as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$4`

### Parameters

#### schema

`TSchema`

The schema to modify.

### Returns

[`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `undefined`, `undefined`\>

An object schema.

## Call Signature

> **requiredAsync**\<`TSchema`, `TMessage`\>(`schema`, `message`): [`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `undefined`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2696

Creates a modified copy of an object schema that marks all entries as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$4`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`

### Parameters

#### schema

`TSchema`

The schema to modify.

#### message

`TMessage`

The error message.

### Returns

[`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `undefined`, `TMessage`\>

An object schema.

## Call Signature

> **requiredAsync**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `TKeys`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2706

Creates a modified copy of an object schema that marks the selected entries
as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$4`

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

[`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `TKeys`, `undefined`\>

An object schema.

## Call Signature

> **requiredAsync**\<`TSchema`, `TKeys`, `TMessage`\>(`schema`, `keys`, `message`): [`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `TKeys`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2717

Creates a modified copy of an object schema that marks the selected entries
as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$4`

#### TKeys

`TKeys` *extends* [`ObjectKeys`](../type-aliases/ObjectKeys.md)\<`TSchema`\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`

### Parameters

#### schema

`TSchema`

The schema to modify.

#### keys

`TKeys`

The selected entries.

#### message

`TMessage`

The error message.

### Returns

[`SchemaWithRequiredAsync`](../type-aliases/SchemaWithRequiredAsync.md)\<`TSchema`, `TKeys`, `TMessage`\>

An object schema.
