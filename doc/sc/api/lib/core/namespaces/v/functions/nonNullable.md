[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonNullable

# Function: nonNullable()

## Call Signature

> **nonNullable**\<`TWrapped$1`\>(`wrapped`): [`NonNullableSchema`](../interfaces/NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5437

Creates a non nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NonNullableSchema`](../interfaces/NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>

A non nullable schema.

## Call Signature

> **nonNullable**\<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullableSchema`](../interfaces/NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5446

Creates a non nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](../interfaces/NonNullableIssue.md)\> \| `undefined`

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

#### message

`TMessage`

The error message.

### Returns

[`NonNullableSchema`](../interfaces/NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>

A non nullable schema.
