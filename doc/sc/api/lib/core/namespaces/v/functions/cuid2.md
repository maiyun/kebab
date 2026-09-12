[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / cuid2

# Function: cuid2()

## Call Signature

> **cuid2**\<`TInput$1`\>(): [`Cuid2Action`](../interfaces/Cuid2Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8506

Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Cuid2Action`](../interfaces/Cuid2Action.md)\<`TInput$1`, `undefined`\>

A Cuid2 action.

## Call Signature

> **cuid2**\<`TInput$1`, `TMessage`\>(`message`): [`Cuid2Action`](../interfaces/Cuid2Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8514

Creates a [Cuid2](https://github.com/paralleldrive/cuid2) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Cuid2Issue`](../interfaces/Cuid2Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Cuid2Action`](../interfaces/Cuid2Action.md)\<`TInput$1`, `TMessage`\>

A Cuid2 action.
