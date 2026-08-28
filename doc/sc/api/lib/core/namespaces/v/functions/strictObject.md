[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / strictObject

# Function: strictObject()

## Call Signature

> **strictObject**\<`TEntries$1`\>(`entries`): [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6818

Creates a strict object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>

A strict object schema.

## Call Signature

> **strictObject**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6827

Creates a strict object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### message

`TMessage`

The error message.

### Returns

[`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>

A strict object schema.
