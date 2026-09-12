[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minGraphemes

# Function: minGraphemes()

## Call Signature

> **minGraphemes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinGraphemesAction`](../interfaces/MinGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12471

Creates a min graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum graphemes.

### Returns

[`MinGraphemesAction`](../interfaces/MinGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min graphemes action.

## Call Signature

> **minGraphemes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinGraphemesAction`](../interfaces/MinGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12480

Creates a min graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinGraphemesIssue`](../interfaces/MinGraphemesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum graphemes.

#### message

`TMessage`

The error message.

### Returns

[`MinGraphemesAction`](../interfaces/MinGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min graphemes action.
