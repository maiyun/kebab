[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / cacheAsync

# Function: cacheAsync()

## Call Signature

> **cacheAsync**\<`TSchema`\>(`schema`): [`SchemaWithCacheAsync`](../type-aliases/SchemaWithCacheAsync.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:157

**`Beta`**

Caches the output of a schema.

Hint: Primitive inputs are cached by value. Object and function inputs are
cached by reference identity, so mutating input objects and reusing the same
reference can return a stale cached dataset. Returned objects are also
reused by reference, so mutating cached output can affect later cache hits.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The schema to cache.

### Returns

[`SchemaWithCacheAsync`](../type-aliases/SchemaWithCacheAsync.md)\<`TSchema`, `undefined`\>

The cached schema.

## Call Signature

> **cacheAsync**\<`TSchema`, `TCacheConfig`\>(`schema`, `config`): [`SchemaWithCacheAsync`](../type-aliases/SchemaWithCacheAsync.md)\<`TSchema`, `TCacheConfig`\>

Defined in: node\_modules/valibot/dist/index.d.mts:173

**`Beta`**

Caches the output of a schema.

Hint: Primitive inputs are cached by value. Object and function inputs are
cached by reference identity, so mutating input objects and reusing the same
reference can return a stale cached dataset. Returned objects are also
reused by reference, so mutating cached output can affect later cache hits.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TCacheConfig

`TCacheConfig` *extends* [`CacheConfig`](../interfaces/CacheConfig.md) \| `undefined`

### Parameters

#### schema

`TSchema`

The schema to cache.

#### config

`TCacheConfig`

The cache config.

### Returns

[`SchemaWithCacheAsync`](../type-aliases/SchemaWithCacheAsync.md)\<`TSchema`, `TCacheConfig`\>

The cached schema.
