[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / empty

# Function: empty()

## Call Signature

> **empty**\<`TInput$1`\>(): [`EmptyAction`](../interfaces/EmptyAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8894

Creates an empty validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

### Returns

[`EmptyAction`](../interfaces/EmptyAction.md)\<`TInput$1`, `undefined`\>

An empty action.

## Call Signature

> **empty**\<`TInput$1`, `TMessage`\>(`message`): [`EmptyAction`](../interfaces/EmptyAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8902

Creates an empty validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EmptyIssue`](../interfaces/EmptyIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`EmptyAction`](../interfaces/EmptyAction.md)\<`TInput$1`, `TMessage`\>

An empty action.
