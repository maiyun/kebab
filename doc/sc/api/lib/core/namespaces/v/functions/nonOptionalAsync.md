[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nonOptionalAsync

# Function: nonOptionalAsync()

## Call Signature

> **nonOptionalAsync**\<`TWrapped$1`\>(`wrapped`): [`NonOptionalSchemaAsync`](../interfaces/NonOptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5727

Creates a non optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NonOptionalSchemaAsync`](../interfaces/NonOptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

A non optional schema.

## Call Signature

> **nonOptionalAsync**\<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonOptionalSchemaAsync`](../interfaces/NonOptionalSchemaAsync.md)\<`TWrapped$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5736

Creates a non optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`NonOptionalSchemaAsync`](../interfaces/NonOptionalSchemaAsync.md)\<`TWrapped$1`, `TMessage`\>

A non optional schema.
