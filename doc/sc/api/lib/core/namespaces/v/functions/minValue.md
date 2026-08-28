[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minValue

# Function: minValue()

## Call Signature

> **minValue**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinValueAction`](../interfaces/MinValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12401

Creates a min value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The minimum value.

### Returns

[`MinValueAction`](../interfaces/MinValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min value action.

## Call Signature

> **minValue**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinValueAction`](../interfaces/MinValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12410

Creates a min value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinValueIssue`](../interfaces/MinValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum value.

#### message

`TMessage`

The error message.

### Returns

[`MinValueAction`](../interfaces/MinValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min value action.
