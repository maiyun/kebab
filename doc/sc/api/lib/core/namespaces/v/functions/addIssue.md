[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / \_addIssue

# Function: \_addIssue()

> **\_addIssue**\<`TContext`\>(`context`, `label`, `dataset`, `config`, `other?`): `void`

Defined in: node\_modules/valibot/dist/index.d.mts:16256

**`Internal`**

Adds an issue to the dataset.

## Type Parameters

### TContext

`TContext` *extends* `Context`

## Parameters

### context

`TContext` & `object`

The issue context.

### label

`string`

The issue label.

### dataset

[`UnknownDataset`](../interfaces/UnknownDataset.md) \| [`OutputDataset`](../type-aliases/OutputDataset.md)\<`unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

The input dataset.

### config

[`Config`](../interfaces/Config.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TContext`\>\>

The configuration.

### other?

`Other`\<`TContext`\>

The optional props.

## Returns

`void`
