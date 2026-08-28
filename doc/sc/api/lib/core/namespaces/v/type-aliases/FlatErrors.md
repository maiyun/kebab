[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FlatErrors

# Type Alias: FlatErrors\<TSchema\>

> **FlatErrors**\<`TSchema`\> = `Prettify`\<\{ `nested?`: `Prettify`\<`Readonly`\<`Partial`\<`Record`\<`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> ? [`IssueDotPath`](IssueDotPath.md)\<`TSchema`\> : `string`, \[`string`, `...string[]`\]\>\>\>\>; `other?`: \[`string`, `...string[]`\]; `root?`: \[`string`, `...string[]`\]; \}\>

Defined in: node\_modules/valibot/dist/index.d.mts:259

Flat errors type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| `undefined`
