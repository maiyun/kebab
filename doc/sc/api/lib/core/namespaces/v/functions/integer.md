[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / integer

# Function: integer()

## Call Signature

> **integer**\<`TInput$1`\>(): [`IntegerAction`](../interfaces/IntegerAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10104

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

### Returns

[`IntegerAction`](../interfaces/IntegerAction.md)\<`TInput$1`, `undefined`\>

An integer action.

## Call Signature

> **integer**\<`TInput$1`, `TMessage`\>(`message`): [`IntegerAction`](../interfaces/IntegerAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10112

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntegerIssue`](../interfaces/IntegerIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IntegerAction`](../interfaces/IntegerAction.md)\<`TInput$1`, `TMessage`\>

An integer action.
