[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithPick

# Type Alias: SchemaWithPick\<TSchema, TKeys\>

> **SchemaWithPick**\<`TSchema`, `TKeys`\> = `TSchema` *extends* [`ObjectSchema`](../interfaces/ObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<infer TEntries, [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<infer TEntries, [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `never`

Defined in: node\_modules/valibot/dist/index.d.mts:2115

Schema with pick type.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$6`

### TKeys

`TKeys` *extends* [`ObjectKeys`](ObjectKeys.md)\<`TSchema`\>
