[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minCodePoints

# Function: minCodePoints()

## Call Signature

> **minCodePoints**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinCodePointsAction`](../interfaces/MinCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12325

Creates a min code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum code points.

### Returns

[`MinCodePointsAction`](../interfaces/MinCodePointsAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min code points action.

## Call Signature

> **minCodePoints**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinCodePointsAction`](../interfaces/MinCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12334

Creates a min code points validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinCodePointsIssue`](../interfaces/MinCodePointsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum code points.

#### message

`TMessage`

The error message.

### Returns

[`MinCodePointsAction`](../interfaces/MinCodePointsAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min code points action.
