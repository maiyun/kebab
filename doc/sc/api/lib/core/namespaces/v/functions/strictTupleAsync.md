[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / strictTupleAsync

# Function: strictTupleAsync()

## Call Signature

> **strictTupleAsync**\<`TItems$1`\>(`items`): [`StrictTupleSchemaAsync`](../interfaces/StrictTupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6969

Creates a strict tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`StrictTupleSchemaAsync`](../interfaces/StrictTupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

A strict tuple schema.

## Call Signature

> **strictTupleAsync**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`StrictTupleSchemaAsync`](../interfaces/StrictTupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6978

Creates a strict tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictTupleIssue`](../interfaces/StrictTupleIssue.md)\> \| `undefined`

### Parameters

#### items

`TItems$1`

The items schema.

#### message

`TMessage`

The error message.

### Returns

[`StrictTupleSchemaAsync`](../interfaces/StrictTupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

A strict tuple schema.
