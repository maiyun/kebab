[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / required

# Function: required()

## Call Signature

> **required**\<`TSchema`\>(`schema`): [`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `undefined`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2519

Creates a modified copy of an object schema that marks all entries as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$5`

### Parameters

#### schema

`TSchema`

The schema to modify.

### Returns

[`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `undefined`, `undefined`\>

An object schema.

## Call Signature

> **required**\<`TSchema`, `TMessage`\>(`schema`, `message`): [`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `undefined`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2528

Creates a modified copy of an object schema that marks all entries as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$5`

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

[`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `undefined`, `TMessage`\>

An object schema.

## Call Signature

> **required**\<`TSchema`, `TKeys`\>(`schema`, `keys`): [`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `TKeys`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2538

Creates a modified copy of an object schema that marks the selected entries
as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$5`

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

[`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `TKeys`, `undefined`\>

An object schema.

## Call Signature

> **required**\<`TSchema`, `TKeys`, `TMessage`\>(`schema`, `keys`, `message`): [`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `TKeys`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2549

Creates a modified copy of an object schema that marks the selected entries
as required.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$5`

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

[`SchemaWithRequired`](../type-aliases/SchemaWithRequired.md)\<`TSchema`, `TKeys`, `TMessage`\>

An object schema.
