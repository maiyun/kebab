[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / arrayAsync

# Function: arrayAsync()

## Call Signature

> **arrayAsync**\<`TItem$1`\>(`item`): [`ArraySchemaAsync`](../interfaces/ArraySchemaAsync.md)\<`TItem$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3889

Creates an array schema.

### Type Parameters

#### TItem$1

`TItem$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### item

`TItem$1`

The item schema.

### Returns

[`ArraySchemaAsync`](../interfaces/ArraySchemaAsync.md)\<`TItem$1`, `undefined`\>

An array schema.

## Call Signature

> **arrayAsync**\<`TItem$1`, `TMessage`\>(`item`, `message`): [`ArraySchemaAsync`](../interfaces/ArraySchemaAsync.md)\<`TItem$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3898

Creates an array schema.

### Type Parameters

#### TItem$1

`TItem$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](../interfaces/ArrayIssue.md)\> \| `undefined`

### Parameters

#### item

`TItem$1`

The item schema.

#### message

`TMessage`

The error message.

### Returns

[`ArraySchemaAsync`](../interfaces/ArraySchemaAsync.md)\<`TItem$1`, `TMessage`\>

An array schema.
