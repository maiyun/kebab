[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / endsWith

# Function: endsWith()

## Call Signature

> **endsWith**\<`TInput$1`, `TRequirement`\>(`requirement`): [`EndsWithAction`](../interfaces/EndsWithAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8962

Creates an ends with validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `string`

### Parameters

#### requirement

`TRequirement`

The end string.

### Returns

[`EndsWithAction`](../interfaces/EndsWithAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

An ends with action.

## Call Signature

> **endsWith**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`EndsWithAction`](../interfaces/EndsWithAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8971

Creates an ends with validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EndsWithIssue`](../interfaces/EndsWithIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The end string.

#### message

`TMessage`

The error message.

### Returns

[`EndsWithAction`](../interfaces/EndsWithAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

An ends with action.
