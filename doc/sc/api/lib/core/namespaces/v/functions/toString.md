[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / toString

# Function: toString()

## Call Signature

> **toString**\<`TInput$1`\>(): [`ToStringAction`](../interfaces/ToStringAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15404

**`Beta`**

Creates a to string transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

### Returns

[`ToStringAction`](../interfaces/ToStringAction.md)\<`TInput$1`, `undefined`\>

A to string action.

## Call Signature

> **toString**\<`TInput$1`, `TMessage`\>(`message`): [`ToStringAction`](../interfaces/ToStringAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15414

**`Beta`**

Creates a to string transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ToStringIssue`](../interfaces/ToStringIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`ToStringAction`](../interfaces/ToStringAction.md)\<`TInput$1`, `TMessage`\>

A to string action.
