[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonEmpty

# Function: nonEmpty()

## Call Signature

> **nonEmpty**\<`TInput$1`\>(): [`NonEmptyAction`](../interfaces/NonEmptyAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12703

Creates a non-empty validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

### Returns

[`NonEmptyAction`](../interfaces/NonEmptyAction.md)\<`TInput$1`, `undefined`\>

A non-empty action.

## Call Signature

> **nonEmpty**\<`TInput$1`, `TMessage`\>(`message`): [`NonEmptyAction`](../interfaces/NonEmptyAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12711

Creates a non-empty validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonEmptyIssue`](../interfaces/NonEmptyIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`NonEmptyAction`](../interfaces/NonEmptyAction.md)\<`TInput$1`, `TMessage`\>

A non-empty action.
