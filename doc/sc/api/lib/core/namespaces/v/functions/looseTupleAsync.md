[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / looseTupleAsync

# Function: looseTupleAsync()

## Call Signature

> **looseTupleAsync**\<`TItems$1`\>(`items`): [`LooseTupleSchemaAsync`](../interfaces/LooseTupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5012

Creates a loose tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`LooseTupleSchemaAsync`](../interfaces/LooseTupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

A loose tuple schema.

## Call Signature

> **looseTupleAsync**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`LooseTupleSchemaAsync`](../interfaces/LooseTupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5021

Creates a loose tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseTupleIssue`](../interfaces/LooseTupleIssue.md)\> \| `undefined`

### Parameters

#### items

`TItems$1`

The items schema.

#### message

`TMessage`

The error message.

### Returns

[`LooseTupleSchemaAsync`](../interfaces/LooseTupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

A loose tuple schema.
