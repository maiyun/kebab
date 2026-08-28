[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / custom

# Function: custom()

## Call Signature

> **custom**\<`TInput$1`\>(`check`): [`CustomSchema`](../interfaces/CustomSchema.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4118

Creates a custom schema.

### Type Parameters

#### TInput$1

`TInput$1`

### Parameters

#### check

`Check`

The type check function.

### Returns

[`CustomSchema`](../interfaces/CustomSchema.md)\<`TInput$1`, `undefined`\>

A custom schema.

## Call Signature

> **custom**\<`TInput$1`, `TMessage`\>(`check`, `message`): [`CustomSchema`](../interfaces/CustomSchema.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4127

Creates a custom schema.

### Type Parameters

#### TInput$1

`TInput$1`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](../interfaces/CustomIssue.md)\> \| `undefined` = [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](../interfaces/CustomIssue.md)\> \| `undefined`

### Parameters

#### check

`Check`

The type check function.

#### message

`TMessage`

The error message.

### Returns

[`CustomSchema`](../interfaces/CustomSchema.md)\<`TInput$1`, `TMessage`\>

A custom schema.
