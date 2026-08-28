[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonNullish

# Function: nonNullish()

## Call Signature

> **nonNullish**\<`TWrapped$1`\>(`wrapped`): [`NonNullishSchema`](../interfaces/NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5560

Creates a non nullish schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NonNullishSchema`](../interfaces/NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>

A non nullish schema.

## Call Signature

> **nonNullish**\<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullishSchema`](../interfaces/NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5569

Creates a non nullish schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](../interfaces/NonNullishIssue.md)\> \| `undefined`

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

#### message

`TMessage`

The error message.

### Returns

[`NonNullishSchema`](../interfaces/NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>

A non nullish schema.
