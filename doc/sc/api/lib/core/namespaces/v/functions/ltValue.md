[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ltValue

# Function: ltValue()

## Call Signature

> **ltValue**\<`TInput$1`, `TRequirement`\>(`requirement`): [`LtValueAction`](../interfaces/LtValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11161

Creates a less than value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The less than value.

### Returns

[`LtValueAction`](../interfaces/LtValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A less than value action.

## Call Signature

> **ltValue**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`LtValueAction`](../interfaces/LtValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11170

Creates a less than value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LtValueIssue`](../interfaces/LtValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The less than value.

#### message

`TMessage`

The error message.

### Returns

[`LtValueAction`](../interfaces/LtValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A less than value action.
