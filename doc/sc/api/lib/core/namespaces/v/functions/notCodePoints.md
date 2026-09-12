[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notCodePoints

# Function: notCodePoints()

## Call Signature

> **notCodePoints**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotCodePointsAction`](../interfaces/NotCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13150

Creates a not code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required code points.

### Returns

[`NotCodePointsAction`](../interfaces/NotCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not code points action.

## Call Signature

> **notCodePoints**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotCodePointsAction`](../interfaces/NotCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13159

Creates a not code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotCodePointsIssue`](../interfaces/NotCodePointsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required code points.

#### message

`TMessage`

The error message.

### Returns

[`NotCodePointsAction`](../interfaces/NotCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not code points action.
