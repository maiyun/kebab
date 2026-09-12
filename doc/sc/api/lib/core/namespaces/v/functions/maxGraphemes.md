[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxGraphemes

# Function: maxGraphemes()

## Call Signature

> **maxGraphemes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxGraphemesAction`](../interfaces/MaxGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11809

Creates a max graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum graphemes.

### Returns

[`MaxGraphemesAction`](../interfaces/MaxGraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max graphemes action.

## Call Signature

> **maxGraphemes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxGraphemesAction`](../interfaces/MaxGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11818

Creates a max graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxGraphemesIssue`](../interfaces/MaxGraphemesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum graphemes.

#### message

`TMessage`

The error message.

### Returns

[`MaxGraphemesAction`](../interfaces/MaxGraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max graphemes action.
