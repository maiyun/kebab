[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / everyItem

# Function: everyItem()

## Call Signature

> **everyItem**\<`TInput$1`\>(`requirement`): [`EveryItemAction`](../interfaces/EveryItemAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9173

Creates an every item validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

### Returns

[`EveryItemAction`](../interfaces/EveryItemAction.md)\<`TInput$1`, `undefined`\>

An every item action.

## Call Signature

> **everyItem**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`EveryItemAction`](../interfaces/EveryItemAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9182

Creates an every item validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EveryItemIssue`](../interfaces/EveryItemIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`EveryItemAction`](../interfaces/EveryItemAction.md)\<`TInput$1`, `TMessage`\>

An every item action.
