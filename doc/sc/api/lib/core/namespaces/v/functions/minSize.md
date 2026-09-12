[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minSize

# Function: minSize()

## Call Signature

> **minSize**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinSizeAction`](../interfaces/MinSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12609

Creates a min size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum size.

### Returns

[`MinSizeAction`](../interfaces/MinSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min size action.

## Call Signature

> **minSize**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinSizeAction`](../interfaces/MinSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12618

Creates a min size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinSizeIssue`](../interfaces/MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum size.

#### message

`TMessage`

The error message.

### Returns

[`MinSizeAction`](../interfaces/MinSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min size action.
