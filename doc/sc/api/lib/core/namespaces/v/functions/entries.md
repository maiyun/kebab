[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / entries

# Function: entries()

## Call Signature

> **entries**\<`TInput$1`, `TRequirement`\>(`requirement`): [`EntriesAction`](../interfaces/EntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9037

**`Beta`**

Creates an entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required entries.

### Returns

[`EntriesAction`](../interfaces/EntriesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

An entries action.

## Call Signature

> **entries**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`EntriesAction`](../interfaces/EntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9048

**`Beta`**

Creates an entries validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EntriesIssue`](../interfaces/EntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required entries.

#### message

`TMessage`

The error message.

### Returns

[`EntriesAction`](../interfaces/EntriesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

An entries action.
