[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / graphemes

# Function: graphemes()

## Call Signature

> **graphemes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`GraphemesAction`](../interfaces/GraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9442

Creates a graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required graphemes.

### Returns

[`GraphemesAction`](../interfaces/GraphemesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A graphemes action.

## Call Signature

> **graphemes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`GraphemesAction`](../interfaces/GraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9451

Creates a graphemes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GraphemesIssue`](../interfaces/GraphemesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required graphemes.

#### message

`TMessage`

The error message.

### Returns

[`GraphemesAction`](../interfaces/GraphemesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A graphemes action.
