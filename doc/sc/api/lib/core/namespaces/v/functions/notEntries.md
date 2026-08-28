[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notEntries

# Function: notEntries()

## Call Signature

> **notEntries**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotEntriesAction`](../interfaces/NotEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12883

**`Beta`**

Creates a not entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required entries.

### Returns

[`NotEntriesAction`](../interfaces/NotEntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not entries action.

## Call Signature

> **notEntries**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotEntriesAction`](../interfaces/NotEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12894

**`Beta`**

Creates a not entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotEntriesIssue`](../interfaces/NotEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required entries.

#### message

`TMessage`

The error message.

### Returns

[`NotEntriesAction`](../interfaces/NotEntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not entries action.
