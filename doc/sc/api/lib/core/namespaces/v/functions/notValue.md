[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notValue

# Function: notValue()

## Call Signature

> **notValue**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotValueAction`](../interfaces/NotValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13499

Creates a not value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### Parameters

#### requirement

`TRequirement`

The not required value.

### Returns

[`NotValueAction`](../interfaces/NotValueAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not value action.

## Call Signature

> **notValue**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotValueAction`](../interfaces/NotValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13508

Creates a not value validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotValueIssue`](../interfaces/NotValueIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required value.

#### message

`TMessage`

The error message.

### Returns

[`NotValueAction`](../interfaces/NotValueAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not value action.
