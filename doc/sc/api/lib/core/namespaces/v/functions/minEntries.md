[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minEntries

# Function: minEntries()

## Call Signature

> **minEntries**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinEntriesAction`](../interfaces/MinEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12127

**`Beta`**

Creates a min entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum entries.

### Returns

[`MinEntriesAction`](../interfaces/MinEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min entries action.

## Call Signature

> **minEntries**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinEntriesAction`](../interfaces/MinEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12138

**`Beta`**

Creates a min entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinEntriesIssue`](../interfaces/MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum entries.

#### message

`TMessage`

The error message.

### Returns

[`MinEntriesAction`](../interfaces/MinEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min entries action.
