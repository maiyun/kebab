[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / value

# Function: value()

## Call Signature

> **value**\<`TInput$1`, `TRequirement`\>(`requirement`): [`ValueAction`](../interfaces/ValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15470

Creates a value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The required value.

### Returns

[`ValueAction`](../interfaces/ValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A value action.

## Call Signature

> **value**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`ValueAction`](../interfaces/ValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15479

Creates a value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ValueIssue`](../interfaces/ValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required value.

#### message

`TMessage`

The error message.

### Returns

[`ValueAction`](../interfaces/ValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A value action.
