[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithCache

# Type Alias: SchemaWithCache\<TSchema, TCacheConfig\>

> **SchemaWithCache**\<`TSchema`, `TCacheConfig`\> = `TSchema` & `object`

Defined in: node\_modules/valibot/dist/index.d.mts:64

**`Beta`**

Schema with cache type.

## Type Declaration

### cache

> `readonly` **cache**: [`Cache`](../interfaces/Cache.md)\<[`OutputDataset`](OutputDataset.md)\<[`InferOutput`](InferOutput.md)\<`TSchema`\>, [`InferIssue`](InferIssue.md)\<`TSchema`\>\>\>

The cache instance.

### cacheConfig

> `readonly` **cacheConfig**: `TCacheConfig`

The cache config.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TCacheConfig

`TCacheConfig` *extends* [`CacheConfig`](../interfaces/CacheConfig.md) \| `undefined`
