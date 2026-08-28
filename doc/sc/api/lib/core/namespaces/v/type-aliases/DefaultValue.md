[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / DefaultValue

# Type Alias: DefaultValue\<TDefault\>

> **DefaultValue**\<`TDefault`\> = `TDefault` *extends* [`DefaultAsync`](DefaultAsync.md)\<infer TWrapped, infer TInput\> ? `TDefault` *extends* (`dataset?`, `config?`) => `MaybePromise`\<`MaybeDeepReadonly`\<[`InferInput`](InferInput.md)\<`TWrapped`\> \| `TInput`\>\> ? `Awaited`\<`ReturnType`\<`TDefault`\>\> : `TDefault` : `never`

Defined in: node\_modules/valibot/dist/index.d.mts:3409

Default value type.

## Type Parameters

### TDefault

`TDefault` *extends* [`Default`](Default.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `null` \| `undefined`\> \| [`DefaultAsync`](DefaultAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `null` \| `undefined`\>
