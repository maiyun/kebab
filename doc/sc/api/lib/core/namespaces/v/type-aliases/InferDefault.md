[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / InferDefault

# Type Alias: InferDefault\<TSchema\>

> **InferDefault**\<`TSchema`\> = `TSchema` *extends* `SchemaWithDefault` \| `SchemaWithDefaultAsync` ? `TSchema`\[`"default"`\] *extends* (...`args`) => `any` ? `ReturnType`\<`TSchema`\[`"default"`\]\> : `TSchema`\[`"default"`\] : `undefined`

Defined in: node\_modules/valibot/dist/index.d.mts:358

Infer default type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| `SchemaWithDefault` \| `SchemaWithDefaultAsync`
