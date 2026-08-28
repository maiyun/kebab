[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / size

# Function: size()

## Call Signature

> **size**\<`TInput$1`, `TRequirement`\>(`requirement`): [`SizeAction`](../interfaces/SizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14298

Creates a size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required size.

### Returns

[`SizeAction`](../interfaces/SizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A size action.

## Call Signature

> **size**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`SizeAction`](../interfaces/SizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14307

Creates a size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SizeIssue`](../interfaces/SizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required size.

#### message

`TMessage`

The error message.

### Returns

[`SizeAction`](../interfaces/SizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A size action.
