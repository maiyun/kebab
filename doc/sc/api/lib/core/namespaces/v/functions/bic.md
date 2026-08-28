[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / bic

# Function: bic()

## Call Signature

> **bic**\<`TInput$1`\>(): [`BicAction`](../interfaces/BicAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7935

Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`BicAction`](../interfaces/BicAction.md)\<`TInput$1`, `undefined`\>

A BIC action.

## Call Signature

> **bic**\<`TInput$1`, `TMessage`\>(`message`): [`BicAction`](../interfaces/BicAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7943

Creates a [BIC](https://en.wikipedia.org/wiki/ISO_9362) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BicIssue`](../interfaces/BicIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`BicAction`](../interfaces/BicAction.md)\<`TInput$1`, `TMessage`\>

A BIC action.
