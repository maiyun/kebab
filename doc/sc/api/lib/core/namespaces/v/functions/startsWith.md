[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / startsWith

# Function: startsWith()

## Call Signature

> **startsWith**\<`TInput$1`, `TRequirement`\>(`requirement`): [`StartsWithAction`](../interfaces/StartsWithAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14529

Creates a starts with validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `string`

### Parameters

#### requirement

`TRequirement`

The start string.

### Returns

[`StartsWithAction`](../interfaces/StartsWithAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A starts with action.

## Call Signature

> **startsWith**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`StartsWithAction`](../interfaces/StartsWithAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14538

Creates a starts with validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StartsWithIssue`](../interfaces/StartsWithIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The start string.

#### message

`TMessage`

The error message.

### Returns

[`StartsWithAction`](../interfaces/StartsWithAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A starts with action.
