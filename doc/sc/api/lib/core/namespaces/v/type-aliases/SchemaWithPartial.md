[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithPartial

# Type Alias: SchemaWithPartial\<TSchema, TKeys\>

> **SchemaWithPartial**\<`TSchema`, `TKeys`\> = `TSchema` *extends* [`ObjectSchema`](../interfaces/ObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<infer TEntries, infer TRest, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `never`

Defined in: node\_modules/valibot/dist/index.d.mts:1823

Schema with partial type.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$8`

### TKeys

`TKeys` *extends* [`ObjectKeys`](ObjectKeys.md)\<`TSchema`\> \| `undefined`
