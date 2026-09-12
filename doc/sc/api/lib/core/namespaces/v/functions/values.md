[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / values

# Function: values()

## Call Signature

> **values**\<`TInput$1`, `TRequirement`\>(`requirement`): [`ValuesAction`](../interfaces/ValuesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15877

Creates a values validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

### Parameters

#### requirement

`TRequirement`

The required values.

### Returns

[`ValuesAction`](../interfaces/ValuesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A values action.

## Call Signature

> **values**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`ValuesAction`](../interfaces/ValuesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15886

Creates a values validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ValuesIssue`](../interfaces/ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required values.

#### message

`TMessage`

The error message.

### Returns

[`ValuesAction`](../interfaces/ValuesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A values action.
