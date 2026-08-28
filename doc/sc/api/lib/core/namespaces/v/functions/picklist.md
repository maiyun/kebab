[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / picklist

# Function: picklist()

## Call Signature

> **picklist**\<`TOptions$1`\>(`options`): [`PicklistSchema`](../interfaces/PicklistSchema.md)\<`TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6432

Creates a picklist schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`PicklistOptions`](../type-aliases/PicklistOptions.md)

### Parameters

#### options

`TOptions$1`

The picklist options.

### Returns

[`PicklistSchema`](../interfaces/PicklistSchema.md)\<`TOptions$1`, `undefined`\>

A picklist schema.

## Call Signature

> **picklist**\<`TOptions$1`, `TMessage`\>(`options`, `message`): [`PicklistSchema`](../interfaces/PicklistSchema.md)\<`TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6441

Creates a picklist schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`PicklistOptions`](../type-aliases/PicklistOptions.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PicklistIssue`](../interfaces/PicklistIssue.md)\> \| `undefined`

### Parameters

#### options

`TOptions$1`

The picklist options.

#### message

`TMessage`

The error message.

### Returns

[`PicklistSchema`](../interfaces/PicklistSchema.md)\<`TOptions$1`, `TMessage`\>

A picklist schema.
