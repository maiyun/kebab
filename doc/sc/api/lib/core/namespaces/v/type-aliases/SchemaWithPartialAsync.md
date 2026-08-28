[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithPartialAsync

# Type Alias: SchemaWithPartialAsync\<TSchema, TKeys\>

> **SchemaWithPartialAsync**\<`TSchema`, `TKeys`\> = `TSchema` *extends* [`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<infer TEntries, infer TRest, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `never`

Defined in: node\_modules/valibot/dist/index.d.mts:1971

Schema with partial type.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$7`

### TKeys

`TKeys` *extends* [`ObjectKeys`](ObjectKeys.md)\<`TSchema`\> \| `undefined`
