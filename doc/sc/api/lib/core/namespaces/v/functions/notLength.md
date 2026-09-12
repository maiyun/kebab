[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notLength

# Function: notLength()

## Call Signature

> **notLength**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotLengthAction`](../interfaces/NotLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13365

Creates a not length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required length.

### Returns

[`NotLengthAction`](../interfaces/NotLengthAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not length action.

## Call Signature

> **notLength**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotLengthAction`](../interfaces/NotLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13374

Creates a not length validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotLengthIssue`](../interfaces/NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required length.

#### message

`TMessage`

The error message.

### Returns

[`NotLengthAction`](../interfaces/NotLengthAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not length action.
