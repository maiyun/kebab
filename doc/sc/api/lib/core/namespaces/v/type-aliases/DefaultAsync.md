[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / DefaultAsync

# Type Alias: DefaultAsync\<TWrapped$1, TInput$1\>

> **DefaultAsync**\<`TWrapped$1`, `TInput$1`\> = `MaybeDeepReadonly`\<[`InferInput`](InferInput.md)\<`TWrapped$1`\> \| `TInput$1`\> \| ((`dataset?`, `config?`) => `MaybePromise`\<`MaybeDeepReadonly`\<[`InferInput`](InferInput.md)\<`TWrapped$1`\> \| `TInput$1`\>\>) \| `undefined`

Defined in: node\_modules/valibot/dist/index.d.mts:3405

Default async type.

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TInput$1

`TInput$1` *extends* `null` \| `undefined`
