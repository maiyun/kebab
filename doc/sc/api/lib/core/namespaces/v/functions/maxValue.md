[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxValue

# Function: maxValue()

## Call Signature

> **maxValue**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxValueAction`](../interfaces/MaxValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12012

Creates a max value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The maximum value.

### Returns

[`MaxValueAction`](../interfaces/MaxValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max value action.

## Call Signature

> **maxValue**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxValueAction`](../interfaces/MaxValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12021

Creates a max value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxValueIssue`](../interfaces/MaxValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum value.

#### message

`TMessage`

The error message.

### Returns

[`MaxValueAction`](../interfaces/MaxValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max value action.
