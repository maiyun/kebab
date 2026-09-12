[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / safeInteger

# Function: safeInteger()

## Call Signature

> **safeInteger**\<`TInput$1`\>(): [`SafeIntegerAction`](../interfaces/SafeIntegerAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14572

Creates a safe integer validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

### Returns

[`SafeIntegerAction`](../interfaces/SafeIntegerAction.md)\<`TInput$1`, `undefined`\>

A safe integer action.

## Call Signature

> **safeInteger**\<`TInput$1`, `TMessage`\>(`message`): [`SafeIntegerAction`](../interfaces/SafeIntegerAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14580

Creates a safe integer validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SafeIntegerIssue`](../interfaces/SafeIntegerIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`SafeIntegerAction`](../interfaces/SafeIntegerAction.md)\<`TInput$1`, `TMessage`\>

A safe integer action.
