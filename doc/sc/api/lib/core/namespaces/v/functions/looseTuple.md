[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / looseTuple

# Function: looseTuple()

## Call Signature

> **looseTuple**\<`TItems$1`\>(`items`): [`LooseTupleSchema`](../interfaces/LooseTupleSchema.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4968

Creates a loose tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`LooseTupleSchema`](../interfaces/LooseTupleSchema.md)\<`TItems$1`, `undefined`\>

A loose tuple schema.

## Call Signature

> **looseTuple**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`LooseTupleSchema`](../interfaces/LooseTupleSchema.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4977

Creates a loose tuple schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

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

[`LooseTupleSchema`](../interfaces/LooseTupleSchema.md)\<`TItems$1`, `TMessage`\>

A loose tuple schema.
