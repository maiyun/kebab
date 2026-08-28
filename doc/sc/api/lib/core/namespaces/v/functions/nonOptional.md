[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonOptional

# Function: nonOptional()

## Call Signature

> **nonOptional**\<`TWrapped$1`\>(`wrapped`): [`NonOptionalSchema`](../interfaces/NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5683

Creates a non optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NonOptionalSchema`](../interfaces/NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

A non optional schema.

## Call Signature

> **nonOptional**\<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonOptionalSchema`](../interfaces/NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5692

Creates a non optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

#### message

`TMessage`

The error message.

### Returns

[`NonOptionalSchema`](../interfaces/NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>

A non optional schema.
