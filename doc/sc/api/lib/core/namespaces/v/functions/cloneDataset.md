[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / \_cloneDataset

# Function: \_cloneDataset()

> **\_cloneDataset**\<`TValue$1`, `TIssue`\>(`dataset`): [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TValue$1`, `TIssue`\>

Defined in: node\_modules/valibot/dist/index.d.mts:16277

Creates a shallow copy of a dataset.

Hint: The `value` is copied by reference, but the `issues` array, its issues
and their `path` arrays are cloned to avoid reusing mutable dataset state
across multiple runs. Mutating a returned object or array value can
therefore affect later cache hits that reuse the same cached output.

## Type Parameters

### TValue$1

`TValue$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>

## Parameters

### dataset

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TValue$1`, `TIssue`\>

The output dataset.

## Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TValue$1`, `TIssue`\>

The copied output dataset.
