[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / checkItems

# Function: checkItems()

## Call Signature

> **checkItems**\<`TInput$1`\>(`requirement`): [`CheckItemsAction`](../interfaces/CheckItemsAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8260

Creates an check items validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

### Returns

[`CheckItemsAction`](../interfaces/CheckItemsAction.md)\<`TInput$1`, `undefined`\>

An check items action.

## Call Signature

> **checkItems**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`CheckItemsAction`](../interfaces/CheckItemsAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8269

Creates an check items validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](../interfaces/CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`CheckItemsAction`](../interfaces/CheckItemsAction.md)\<`TInput$1`, `TMessage`\>

An check items action.
