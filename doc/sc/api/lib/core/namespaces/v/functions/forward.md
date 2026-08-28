[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / forward

# Function: forward()

> **forward**\<`TInput$1`, `TIssue`, `TPath`\>(`action`, `path`): [`BaseValidation`](../interfaces/BaseValidation.md)\<`TInput$1`, `TInput$1`, `TIssue`\>

Defined in: node\_modules/valibot/dist/index.d.mts:333

Forwards the issues of the passed validation action.

## Type Parameters

### TInput$1

`TInput$1` *extends* `Record`\<`string`, `unknown`\> \| `ArrayLike`\<`unknown`\>

### TIssue

`TIssue` *extends* [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>

### TPath

`TPath` *extends* readonly \[`string` \| `number`, `string` \| `number`\]

## Parameters

### action

[`BaseValidation`](../interfaces/BaseValidation.md)\<`TInput$1`, `TInput$1`, `TIssue`\>

The validation action.

### path

`ValidPath$1`\<`TInput$1`, `TPath`\>

The path to forward the issues to.

## Returns

[`BaseValidation`](../interfaces/BaseValidation.md)\<`TInput$1`, `TInput$1`, `TIssue`\>

The modified action.
