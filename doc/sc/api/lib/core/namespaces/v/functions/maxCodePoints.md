[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxCodePoints

# Function: maxCodePoints()

## Call Signature

> **maxCodePoints**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxCodePointsAction`](../interfaces/MaxCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11663

Creates a max code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum code points.

### Returns

[`MaxCodePointsAction`](../interfaces/MaxCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max code points action.

## Call Signature

> **maxCodePoints**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxCodePointsAction`](../interfaces/MaxCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11672

Creates a max code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxCodePointsIssue`](../interfaces/MaxCodePointsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum code points.

#### message

`TMessage`

The error message.

### Returns

[`MaxCodePointsAction`](../interfaces/MaxCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max code points action.
