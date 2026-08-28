[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / includes

# Function: includes()

## Call Signature

> **includes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`IncludesAction`](../interfaces/IncludesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9968

Creates an includes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ContentInput`](../type-aliases/ContentInput.md)

#### TRequirement

`TRequirement` *extends* `unknown`

### Parameters

#### requirement

`TRequirement`

The content to be included.

### Returns

[`IncludesAction`](../interfaces/IncludesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

An includes action.

## Call Signature

> **includes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`IncludesAction`](../interfaces/IncludesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9977

Creates an includes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ContentInput`](../type-aliases/ContentInput.md)

#### TRequirement

`TRequirement` *extends* `unknown`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IncludesIssue`](../interfaces/IncludesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The content to be included.

#### message

`TMessage`

The error message.

### Returns

[`IncludesAction`](../interfaces/IncludesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

An includes action.
