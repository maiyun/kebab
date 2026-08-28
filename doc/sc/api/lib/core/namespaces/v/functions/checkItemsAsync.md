[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / checkItemsAsync

# Function: checkItemsAsync()

## Call Signature

> **checkItemsAsync**\<`TInput$1`\>(`requirement`): [`CheckItemsActionAsync`](../interfaces/CheckItemsActionAsync.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8304

Creates a check items validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### Parameters

#### requirement

[`ArrayRequirementAsync`](../type-aliases/ArrayRequirementAsync.md)\<`TInput$1`\>

The validation function.

### Returns

[`CheckItemsActionAsync`](../interfaces/CheckItemsActionAsync.md)\<`TInput$1`, `undefined`\>

A check items action.

## Call Signature

> **checkItemsAsync**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`CheckItemsActionAsync`](../interfaces/CheckItemsActionAsync.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8313

Creates a check items validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](../interfaces/CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

[`ArrayRequirementAsync`](../type-aliases/ArrayRequirementAsync.md)\<`TInput$1`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`CheckItemsActionAsync`](../interfaces/CheckItemsActionAsync.md)\<`TInput$1`, `TMessage`\>

A check items action.
