[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / strictTuple

# Function: strictTuple()

## Call Signature

> **strictTuple**\<`TItems$1`\>(`items`): [`StrictTupleSchema`](../interfaces/StrictTupleSchema.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6925

Creates a strict tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`StrictTupleSchema`](../interfaces/StrictTupleSchema.md)\<`TItems$1`, `undefined`\>

A strict tuple schema.

## Call Signature

> **strictTuple**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`StrictTupleSchema`](../interfaces/StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6934

Creates a strict tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

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

[`StrictTupleSchema`](../interfaces/StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>

A strict tuple schema.
