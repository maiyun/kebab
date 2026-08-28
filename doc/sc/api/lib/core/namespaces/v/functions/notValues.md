[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notValues

# Function: notValues()

## Call Signature

> **notValues**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotValuesAction`](../interfaces/NotValuesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13222

Creates a not values validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

### Parameters

#### requirement

`TRequirement`

The not required values.

### Returns

[`NotValuesAction`](../interfaces/NotValuesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not values action.

## Call Signature

> **notValues**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotValuesAction`](../interfaces/NotValuesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13231

Creates a not values validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotValuesIssue`](../interfaces/NotValuesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required values.

#### message

`TMessage`

The error message.

### Returns

[`NotValuesAction`](../interfaces/NotValuesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not values action.
