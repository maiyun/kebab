[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxLength

# Function: maxLength()

## Call Signature

> **maxLength**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxLengthAction`](../interfaces/MaxLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11878

Creates a max length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum length.

### Returns

[`MaxLengthAction`](../interfaces/MaxLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max length action.

## Call Signature

> **maxLength**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxLengthAction`](../interfaces/MaxLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11887

Creates a max length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxLengthIssue`](../interfaces/MaxLengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum length.

#### message

`TMessage`

The error message.

### Returns

[`MaxLengthAction`](../interfaces/MaxLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max length action.
