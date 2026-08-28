[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / decimal

# Function: decimal()

## Call Signature

> **decimal**\<`TInput$1`\>(): [`DecimalAction`](../interfaces/DecimalAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8507

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

The difference between `decimal` and `digits` is that `decimal` accepts
floating point numbers and negative numbers, while `digits` accepts only the
digits 0-9.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`DecimalAction`](../interfaces/DecimalAction.md)\<`TInput$1`, `undefined`\>

An decimal action.

## Call Signature

> **decimal**\<`TInput$1`, `TMessage`\>(`message`): [`DecimalAction`](../interfaces/DecimalAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8519

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

The difference between `decimal` and `digits` is that `decimal` accepts
floating point numbers and negative numbers, while `digits` accepts only the
digits 0-9.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`DecimalIssue`](../interfaces/DecimalIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`DecimalAction`](../interfaces/DecimalAction.md)\<`TInput$1`, `TMessage`\>

An decimal action.
