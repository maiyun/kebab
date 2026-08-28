[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonNullableAsync

# Function: nonNullableAsync()

## Call Signature

> **nonNullableAsync**\<`TWrapped$1`\>(`wrapped`): [`NonNullableSchemaAsync`](../interfaces/NonNullableSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5481

Creates a non nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NonNullableSchemaAsync`](../interfaces/NonNullableSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

A non nullable schema.

## Call Signature

> **nonNullableAsync**\<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullableSchemaAsync`](../interfaces/NonNullableSchemaAsync.md)\<`TWrapped$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5490

Creates a non nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](../interfaces/NonNullableIssue.md)\> \| `undefined`

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

#### message

`TMessage`

The error message.

### Returns

[`NonNullableSchemaAsync`](../interfaces/NonNullableSchemaAsync.md)\<`TWrapped$1`, `TMessage`\>

A non nullable schema.
