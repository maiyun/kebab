[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minLength

# Function: minLength()

## Call Signature

> **minLength**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinLengthAction`](../interfaces/MinLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12540

Creates a min length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum length.

### Returns

[`MinLengthAction`](../interfaces/MinLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min length action.

## Call Signature

> **minLength**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinLengthAction`](../interfaces/MinLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12549

Creates a min length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinLengthIssue`](../interfaces/MinLengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum length.

#### message

`TMessage`

The error message.

### Returns

[`MinLengthAction`](../interfaces/MinLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min length action.
