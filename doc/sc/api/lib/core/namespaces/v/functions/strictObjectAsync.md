[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / strictObjectAsync

# Function: strictObjectAsync()

## Call Signature

> **strictObjectAsync**\<`TEntries$1`\>(`entries`): [`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6862

Creates a strict object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

A strict object schema.

## Call Signature

> **strictObjectAsync**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6871

Creates a strict object schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

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

[`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

A strict object schema.
