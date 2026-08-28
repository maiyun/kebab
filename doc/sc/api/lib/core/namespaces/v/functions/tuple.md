[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / tuple

# Function: tuple()

## Call Signature

> **tuple**\<`TItems$1`\>(`items`): [`TupleSchema`](../interfaces/TupleSchema.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7145

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTuple`. To
return an issue for unknown items, use `strictTuple`. To include and
validate unknown items, use `tupleWithRest`.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`TupleSchema`](../interfaces/TupleSchema.md)\<`TItems$1`, `undefined`\>

A tuple schema.

## Call Signature

> **tuple**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`TupleSchema`](../interfaces/TupleSchema.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7159

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTuple`. To
return an issue for unknown items, use `strictTuple`. To include and
validate unknown items, use `tupleWithRest`.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleIssue`](../interfaces/TupleIssue.md)\> \| `undefined`

### Parameters

#### items

`TItems$1`

The items schema.

#### message

`TMessage`

The error message.

### Returns

[`TupleSchema`](../interfaces/TupleSchema.md)\<`TItems$1`, `TMessage`\>

A tuple schema.
