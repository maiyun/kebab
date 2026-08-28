[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / set

# Function: set()

## Call Signature

> **set**\<`TValue$1`\>(`value`): [`SetSchema`](../interfaces/SetSchema.md)\<`TValue$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6711

Creates a set schema.

### Type Parameters

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### value

`TValue$1`

The value schema.

### Returns

[`SetSchema`](../interfaces/SetSchema.md)\<`TValue$1`, `undefined`\>

A set schema.

## Call Signature

> **set**\<`TValue$1`, `TMessage`\>(`value`, `message`): [`SetSchema`](../interfaces/SetSchema.md)\<`TValue$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6720

Creates a set schema.

### Type Parameters

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](../interfaces/SetIssue.md)\> \| `undefined`

### Parameters

#### value

`TValue$1`

The value schema.

#### message

`TMessage`

The error message.

### Returns

[`SetSchema`](../interfaces/SetSchema.md)\<`TValue$1`, `TMessage`\>

A set schema.
