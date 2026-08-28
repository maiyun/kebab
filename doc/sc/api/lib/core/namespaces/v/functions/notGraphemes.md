[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notGraphemes

# Function: notGraphemes()

## Call Signature

> **notGraphemes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotGraphemesAction`](../interfaces/NotGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12954

Creates a not graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required graphemes.

### Returns

[`NotGraphemesAction`](../interfaces/NotGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not graphemes action.

## Call Signature

> **notGraphemes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotGraphemesAction`](../interfaces/NotGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12963

Creates a not graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotGraphemesIssue`](../interfaces/NotGraphemesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required graphemes.

#### message

`TMessage`

The error message.

### Returns

[`NotGraphemesAction`](../interfaces/NotGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not graphemes action.
