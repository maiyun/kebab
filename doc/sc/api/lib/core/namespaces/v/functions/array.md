[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / array

# Function: array()

## Call Signature

> **array**\<`TItem$1`\>(`item`): [`ArraySchema`](../interfaces/ArraySchema.md)\<`TItem$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3845

Creates an array schema.

### Type Parameters

#### TItem$1

`TItem$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### item

`TItem$1`

The item schema.

### Returns

[`ArraySchema`](../interfaces/ArraySchema.md)\<`TItem$1`, `undefined`\>

An array schema.

## Call Signature

> **array**\<`TItem$1`, `TMessage`\>(`item`, `message`): [`ArraySchema`](../interfaces/ArraySchema.md)\<`TItem$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3854

Creates an array schema.

### Type Parameters

#### TItem$1

`TItem$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`ArraySchema`](../interfaces/ArraySchema.md)\<`TItem$1`, `TMessage`\>

An array schema.
