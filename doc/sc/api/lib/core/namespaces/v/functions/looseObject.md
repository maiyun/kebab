[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / looseObject

# Function: looseObject()

## Call Signature

> **looseObject**\<`TEntries$1`\>(`entries`): [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4857

Creates a loose object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>

A loose object schema.

## Call Signature

> **looseObject**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4866

Creates a loose object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### message

`TMessage`

The error message.

### Returns

[`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>

A loose object schema.
