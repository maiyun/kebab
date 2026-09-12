[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notSize

# Function: notSize()

## Call Signature

> **notSize**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotSizeAction`](../interfaces/NotSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13434

Creates a not size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required size.

### Returns

[`NotSizeAction`](../interfaces/NotSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not size action.

## Call Signature

> **notSize**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotSizeAction`](../interfaces/NotSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13443

Creates a not size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotSizeIssue`](../interfaces/NotSizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required size.

#### message

`TMessage`

The error message.

### Returns

[`NotSizeAction`](../interfaces/NotSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not size action.
