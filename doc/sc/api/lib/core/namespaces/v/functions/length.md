[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / length

# Function: length()

## Call Signature

> **length**\<`TInput$1`, `TRequirement`\>(`requirement`): [`LengthAction`](../interfaces/LengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11096

Creates a length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required length.

### Returns

[`LengthAction`](../interfaces/LengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A length action.

## Call Signature

> **length**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`LengthAction`](../interfaces/LengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11105

Creates a length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LengthIssue`](../interfaces/LengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required length.

#### message

`TMessage`

The error message.

### Returns

[`LengthAction`](../interfaces/LengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A length action.
