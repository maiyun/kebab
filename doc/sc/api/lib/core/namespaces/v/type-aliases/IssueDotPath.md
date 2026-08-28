[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IssueDotPath

# Type Alias: IssueDotPath\<TSchema\>

> **IssueDotPath**\<`TSchema`\> = `TSchema` *extends* [`SchemaWithPipe`](SchemaWithPipe.md)\<infer TPipe\> ? `IssueDotPath`\<`FirstTupleItem`\<`TPipe`\>\> : `TSchema` *extends* [`SchemaWithPipeAsync`](SchemaWithPipeAsync.md)\<infer TPipe\> ? `IssueDotPath`\<`FirstTupleItem`\<`TPipe`\>\> : `TSchema` *extends* [`ArraySchema`](../interfaces/ArraySchema.md)\<infer TItem, [`ErrorMessage`](ErrorMessage.md)\<[`ArrayIssue`](../interfaces/ArrayIssue.md)\> \| `undefined`\> ? `DotPath`\<`number`, `TItem`\> : `TSchema` *extends* [`ArraySchemaAsync`](../interfaces/ArraySchemaAsync.md)\<infer TItem, [`ErrorMessage`](ErrorMessage.md)\<[`ArrayIssue`](../interfaces/ArrayIssue.md)\> \| `undefined`\> ? `DotPath`\<`number`, `TItem`\> : `TSchema` *extends* [`IntersectSchema`](../interfaces/IntersectSchema.md)\<infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`IntersectIssue`](../interfaces/IntersectIssue.md)\> \| `undefined`\> \| [`UnionSchema`](../interfaces/UnionSchema.md)\<infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`UnionIssue`](../interfaces/UnionIssue.md)\<[`BaseIssue`](../interfaces/BaseIssue.md)\<...\>\>\> \| `undefined`\> \| [`VariantSchema`](../interfaces/VariantSchema.md)\<`string`, infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`VariantIssue`](../interfaces/VariantIssue.md)\> \| `undefined`\> ? `IssueDotPath`\<`TOptions`\[`number`\]\> : `TSchema` *extends* [`IntersectSchemaAsync`](../interfaces/IntersectSchemaAsync.md)\<infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`IntersectIssue`](../interfaces/IntersectIssue.md)\> \| `undefined`\> \| [`UnionSchemaAsync`](../interfaces/UnionSchemaAsync.md)\<infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`UnionIssue`](../interfaces/UnionIssue.md)\<...\>\> \| `undefined`\> \| [`VariantSchemaAsync`](../interfaces/VariantSchemaAsync.md)\<`string`, infer TOptions, [`ErrorMessage`](ErrorMessage.md)\<[`VariantIssue`](../interfaces/VariantIssue.md)\> \| `undefined`\> ? `IssueDotPath`\<`TOptions`\[`number`\]\> : `TSchema` *extends* [`MapSchema`](../interfaces/MapSchema.md)\<infer TKey, infer TValue, [`ErrorMessage`](ErrorMessage.md)\<...\> \| `undefined`\> \| [`RecordSchema`](../interfaces/RecordSchema.md)\<infer TKey, infer TValue, [`ErrorMessage`](ErrorMessage.md)\<...\> \| `undefined`\> ? `DotPath`\<[`InferInput`](InferInput.md)\<`TKey`\>, `TValue`\> : `TSchema` *extends* [`MapSchemaAsync`](../interfaces/MapSchemaAsync.md)\<infer TKey, infer TValue, ... \| ...\> \| [`RecordSchemaAsync`](../interfaces/RecordSchemaAsync.md)\<infer TKey, infer TValue, ... \| ...\> ? `DotPath`\<[`InferInput`](InferInput.md)\<`TKey`\>, `TValue`\> : `TSchema` *extends* [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<..., ...\> \| [`ObjectSchema`](../interfaces/ObjectSchema.md)\<..., ...\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<..., ...\> ? `ObjectPath`\<`TEntries`\> : `TSchema` *extends* ... \| ... \| ... ? `ObjectPath`\<...\> : ... *extends* ... ? ... : ...

Defined in: node\_modules/valibot/dist/index.d.mts:3699

Issue dot path type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>
