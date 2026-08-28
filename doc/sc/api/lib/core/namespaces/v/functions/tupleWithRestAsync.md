[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / tupleWithRestAsync

# Function: tupleWithRestAsync()

## Call Signature

> **tupleWithRestAsync**\<`TItems$1`, `TRest$1`\>(`items`, `rest`): [`TupleWithRestSchemaAsync`](../interfaces/TupleWithRestSchemaAsync.md)\<`TItems$1`, `TRest$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7322

Creates a tuple with rest schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### items

`TItems$1`

The items schema.

#### rest

`TRest$1`

The rest schema.

### Returns

[`TupleWithRestSchemaAsync`](../interfaces/TupleWithRestSchemaAsync.md)\<`TItems$1`, `TRest$1`, `undefined`\>

A tuple with rest schema.

## Call Signature

> **tupleWithRestAsync**\<`TItems$1`, `TRest$1`, `TMessage`\>(`items`, `rest`, `message`): [`TupleWithRestSchemaAsync`](../interfaces/TupleWithRestSchemaAsync.md)\<`TItems$1`, `TRest$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7332

Creates a tuple with rest schema.

### Type Parameters

#### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleWithRestIssue`](../interfaces/TupleWithRestIssue.md)\> \| `undefined`

### Parameters

#### items

`TItems$1`

The items schema.

#### rest

`TRest$1`

The rest schema.

#### message

`TMessage`

The error message.

### Returns

[`TupleWithRestSchemaAsync`](../interfaces/TupleWithRestSchemaAsync.md)\<`TItems$1`, `TRest$1`, `TMessage`\>

A tuple with rest schema.
