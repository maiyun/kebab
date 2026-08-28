[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithFallbackAsync

# Type Alias: SchemaWithFallbackAsync\<TSchema, TFallback$1\>

> **SchemaWithFallbackAsync**\<`TSchema`, `TFallback$1`\> = `Omit`\<`TSchema`, `"async"` \| `"~standard"` \| `"~run"`\> & `object`

Defined in: node\_modules/valibot/dist/index.d.mts:218

Schema with fallback async type.

## Type Declaration

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](OutputDataset.md)\<[`InferOutput`](InferOutput.md)\<`TSchema`\>, [`InferIssue`](InferIssue.md)\<`TSchema`\>\>\>

**`Internal`**

Parses unknown input values.

#### Parameters

##### dataset

[`UnknownDataset`](../interfaces/UnknownDataset.md)

The input dataset.

##### config

[`Config`](../interfaces/Config.md)\<[`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

`Promise`\<[`OutputDataset`](OutputDataset.md)\<[`InferOutput`](InferOutput.md)\<`TSchema`\>, [`InferIssue`](InferIssue.md)\<`TSchema`\>\>\>

The output dataset.

### ~standard

> `readonly` **~standard**: [`StandardProps`](../interfaces/StandardProps.md)\<[`InferInput`](InferInput.md)\<`TSchema`\>, [`InferOutput`](InferOutput.md)\<`TSchema`\>\>

**`Internal`**

The Standard Schema properties.

### async

> `readonly` **async**: `true`

Whether it's async.

### fallback

> `readonly` **fallback**: `TFallback$1`

The fallback value.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TFallback$1

`TFallback$1` *extends* [`FallbackAsync`](FallbackAsync.md)\<`TSchema`\>
