[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / creditCard

# Function: creditCard()

## Call Signature

> **creditCard**\<`TInput$1`\>(): [`CreditCardAction`](../interfaces/CreditCardAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8371

Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`CreditCardAction`](../interfaces/CreditCardAction.md)\<`TInput$1`, `undefined`\>

A Credit card action.

## Call Signature

> **creditCard**\<`TInput$1`, `TMessage`\>(`message`): [`CreditCardAction`](../interfaces/CreditCardAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8379

Creates a [credit card](https://en.wikipedia.org/wiki/Payment_card_number) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CreditCardIssue`](../interfaces/CreditCardIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`CreditCardAction`](../interfaces/CreditCardAction.md)\<`TInput$1`, `TMessage`\>

A credit card action.
