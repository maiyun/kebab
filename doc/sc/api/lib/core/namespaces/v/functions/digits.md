[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / digits

# Function: digits()

## Call Signature

> **digits**\<`TInput$1`\>(): [`DigitsAction`](../interfaces/DigitsAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8677

Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.

The difference between `digits` and `decimal` is that `digits` accepts only
the digits 0-9, while `decimal` accepts floating point numbers and negative
numbers.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`DigitsAction`](../interfaces/DigitsAction.md)\<`TInput$1`, `undefined`\>

An digits action.

## Call Signature

> **digits**\<`TInput$1`, `TMessage`\>(`message`): [`DigitsAction`](../interfaces/DigitsAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8689

Creates a [digits](https://en.wikipedia.org/wiki/Numerical_digit) validation action.

The difference between `digits` and `decimal` is that `digits` accepts only
the digits 0-9, while `decimal` accepts floating point numbers and negative
numbers.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`DigitsIssue`](../interfaces/DigitsIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`DigitsAction`](../interfaces/DigitsAction.md)\<`TInput$1`, `TMessage`\>

An digits action.
