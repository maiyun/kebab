[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FallbackAsync

# Type Alias: FallbackAsync\<TSchema\>

> **FallbackAsync**\<`TSchema`\> = `MaybeDeepReadonly`\<[`InferOutput`](InferOutput.md)\<`TSchema`\>\> \| ((`dataset?`, `config?`) => `MaybePromise`\<`MaybeDeepReadonly`\<[`InferOutput`](InferOutput.md)\<`TSchema`\>\>\>)

Defined in: node\_modules/valibot/dist/index.d.mts:214

Fallback async type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>
