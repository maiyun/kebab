[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxEntries

# Function: maxEntries()

## Call Signature

> **maxEntries**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxEntriesAction`](../interfaces/MaxEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11738

**`Beta`**

Creates a max entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum entries.

### Returns

[`MaxEntriesAction`](../interfaces/MaxEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max entries action.

## Call Signature

> **maxEntries**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxEntriesAction`](../interfaces/MaxEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11749

**`Beta`**

Creates a max entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxEntriesIssue`](../interfaces/MaxEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum entries.

#### message

`TMessage`

The error message.

### Returns

[`MaxEntriesAction`](../interfaces/MaxEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max entries action.
