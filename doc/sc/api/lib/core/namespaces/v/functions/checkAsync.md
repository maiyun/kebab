[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / checkAsync

# Function: checkAsync()

## Call Signature

> **checkAsync**\<`TInput$1`\>(`requirement`): [`CheckActionAsync`](../interfaces/CheckActionAsync.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8155

Creates a check validation action.

### Type Parameters

#### TInput$1

`TInput$1`

### Parameters

#### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

### Returns

[`CheckActionAsync`](../interfaces/CheckActionAsync.md)\<`TInput$1`, `undefined`\>

A check action.

## Call Signature

> **checkAsync**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`CheckActionAsync`](../interfaces/CheckActionAsync.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8164

Creates a check validation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckIssue`](../interfaces/CheckIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`CheckActionAsync`](../interfaces/CheckActionAsync.md)\<`TInput$1`, `TMessage`\>

A check action.
