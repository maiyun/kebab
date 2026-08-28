[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / tupleAsync

# Function: tupleAsync()

## Call Signature

> **tupleAsync**\<`TItems$1`\>(`items`): [`TupleSchemaAsync`](../interfaces/TupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7199

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTupleAsync`. To
return an issue for unknown items, use `strictTupleAsync`. To include and
validate unknown items, use `tupleWithRestAsync`.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

### Parameters

#### items

`TItems$1`

The items schema.

### Returns

[`TupleSchemaAsync`](../interfaces/TupleSchemaAsync.md)\<`TItems$1`, `undefined`\>

A tuple schema.

## Call Signature

> **tupleAsync**\<`TItems$1`, `TMessage`\>(`items`, `message`): [`TupleSchemaAsync`](../interfaces/TupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7213

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTupleAsync`. To
return an issue for unknown items, use `strictTupleAsync`. To include and
validate unknown items, use `tupleWithRestAsync`.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

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

[`TupleSchemaAsync`](../interfaces/TupleSchemaAsync.md)\<`TItems$1`, `TMessage`\>

A tuple schema.
