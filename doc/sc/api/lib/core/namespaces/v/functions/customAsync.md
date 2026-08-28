[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / customAsync

# Function: customAsync()

## Call Signature

> **customAsync**\<`TInput$1`\>(`check`): [`CustomSchemaAsync`](../interfaces/CustomSchemaAsync.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4166

Creates a custom schema.

### Type Parameters

#### TInput$1

`TInput$1`

### Parameters

#### check

`CheckAsync`

The type check function.

### Returns

[`CustomSchemaAsync`](../interfaces/CustomSchemaAsync.md)\<`TInput$1`, `undefined`\>

A custom schema.

## Call Signature

> **customAsync**\<`TInput$1`, `TMessage`\>(`check`, `message`): [`CustomSchemaAsync`](../interfaces/CustomSchemaAsync.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4175

Creates a custom schema.

### Type Parameters

#### TInput$1

`TInput$1`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](../interfaces/CustomIssue.md)\> \| `undefined` = [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](../interfaces/CustomIssue.md)\> \| `undefined`

### Parameters

#### check

`CheckAsync`

The type check function.

#### message

`TMessage`

The error message.

### Returns

[`CustomSchemaAsync`](../interfaces/CustomSchemaAsync.md)\<`TInput$1`, `TMessage`\>

A custom schema.
