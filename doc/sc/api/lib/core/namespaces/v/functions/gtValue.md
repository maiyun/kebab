[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / gtValue

# Function: gtValue()

## Call Signature

> **gtValue**\<`TInput$1`, `TRequirement`\>(`requirement`): [`GtValueAction`](../interfaces/GtValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9507

Creates a greater than value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The greater than value.

### Returns

[`GtValueAction`](../interfaces/GtValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A greater than value action.

## Call Signature

> **gtValue**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`GtValueAction`](../interfaces/GtValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9516

Creates a greater than value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GtValueIssue`](../interfaces/GtValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The greater than value.

#### message

`TMessage`

The error message.

### Returns

[`GtValueAction`](../interfaces/GtValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A greater than value action.
