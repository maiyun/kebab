[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / someItem

# Function: someItem()

## Call Signature

> **someItem**\<`TInput$1`\>(`requirement`): [`SomeItemAction`](../interfaces/SomeItemAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14429

Creates a some item validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

### Returns

[`SomeItemAction`](../interfaces/SomeItemAction.md)\<`TInput$1`, `undefined`\>

A some item action.

## Call Signature

> **someItem**\<`TInput$1`, `TMessage`\>(`requirement`, `message`): [`SomeItemAction`](../interfaces/SomeItemAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14438

Creates a some item validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SomeItemIssue`](../interfaces/SomeItemIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

#### message

`TMessage`

The error message.

### Returns

[`SomeItemAction`](../interfaces/SomeItemAction.md)\<`TInput$1`, `TMessage`\>

A some item action.
