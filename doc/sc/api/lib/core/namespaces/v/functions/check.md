[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / check

# Function: check()

## Call Signature

> **check**\<`TInput$1`\>(`requirement`): [`CheckAction`](../interfaces/CheckAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8111

Creates a check validation action.

### Type Parameters

#### TInput$1

`TInput$1`

### Parameters

#### requirement

(`input`) => `boolean`

The validation function.

### Returns

[`CheckAction`](../interfaces/CheckAction.md)\<`TInput$1`, `undefined`\>

A check action.

## Call Signature

> **check**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`CheckAction`](../interfaces/CheckAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8120

Creates a check validation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckIssue`](../interfaces/CheckIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

(`input`) => `boolean`

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`CheckAction`](../interfaces/CheckAction.md)\<`TInput$1`, `TMessage`\>

A check action.
