[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / looseObjectAsync

# Function: looseObjectAsync()

## Call Signature

> **looseObjectAsync**\<`TEntries$1`\>(`entries`): [`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4905

Creates a loose object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

A loose object schema.

## Call Signature

> **looseObjectAsync**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4914

Creates a loose object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

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

[`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

A loose object schema.
