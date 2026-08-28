[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithRequired

# Type Alias: SchemaWithRequired\<TSchema, TKeys, TMessage\>

> **SchemaWithRequired**\<`TSchema`, `TKeys`, `TMessage`\> = `TSchema` *extends* [`ObjectSchema`](../interfaces/ObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<infer TEntries, [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `TSchema` *extends* [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<infer TEntries, infer TRest, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> ? `Omit`\<`TSchema`, `"entries"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object` : `never`

Defined in: node\_modules/valibot/dist/index.d.mts:2395

Schema with required type.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$5`

### TKeys

`TKeys` *extends* [`ObjectKeys`](ObjectKeys.md)\<`TSchema`\> \| `undefined`

### TMessage

`TMessage` *extends* [`ErrorMessage`](ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`
