[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / codePoints

# Function: codePoints()

## Call Signature

> **codePoints**\<`TInput$1`, `TRequirement`\>(`requirement`): [`CodePointsAction`](../interfaces/CodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8373

Creates a code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required code points.

### Returns

[`CodePointsAction`](../interfaces/CodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A code points action.

## Call Signature

> **codePoints**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`CodePointsAction`](../interfaces/CodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8382

Creates a code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CodePointsIssue`](../interfaces/CodePointsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required code points.

#### message

`TMessage`

The error message.

### Returns

[`CodePointsAction`](../interfaces/CodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A code points action.
