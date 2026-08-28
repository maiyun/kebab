[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / InferFallback

# Type Alias: InferFallback\<TSchema\>

> **InferFallback**\<`TSchema`\> = `TSchema` *extends* [`SchemaWithFallback`](SchemaWithFallback.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, infer TFallback\> \| [`SchemaWithFallbackAsync`](SchemaWithFallbackAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, infer TFallback\> ? `TFallback` *extends* `MaybeDeepReadonly`\<[`InferOutput`](InferOutput.md)\<`TSchema`\>\> ? `TFallback` : `TFallback` *extends* () => `MaybePromise`\<`MaybeDeepReadonly`\<[`InferOutput`](InferOutput.md)\<`TSchema`\>\>\> ? `ReturnType`\<`TFallback`\> : `never` : `undefined`

Defined in: node\_modules/valibot/dist/index.d.mts:454

Infer fallback type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>
