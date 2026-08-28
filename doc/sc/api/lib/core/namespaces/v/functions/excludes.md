[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / excludes

# Function: excludes()

## Call Signature

> **excludes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`ExcludesAction`](../interfaces/ExcludesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9198

Creates an excludes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ContentInput`](../type-aliases/ContentInput.md)

#### TRequirement

`TRequirement` *extends* `unknown`

### Parameters

#### requirement

`TRequirement`

The content to be excluded.

### Returns

[`ExcludesAction`](../interfaces/ExcludesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

An excludes action.

## Call Signature

> **excludes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`ExcludesAction`](../interfaces/ExcludesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9207

Creates an excludes validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`ContentInput`](../type-aliases/ContentInput.md)

#### TRequirement

`TRequirement` *extends* `unknown`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ExcludesIssue`](../interfaces/ExcludesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The content to be excluded.

#### message

`TMessage`

The error message.

### Returns

[`ExcludesAction`](../interfaces/ExcludesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

An excludes action.
