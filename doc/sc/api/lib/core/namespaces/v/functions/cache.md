[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / cache

# Function: cache()

## Call Signature

> **cache**\<`TSchema`\>(`schema`): [`SchemaWithCache`](../type-aliases/SchemaWithCache.md)\<`TSchema`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:88

**`Beta`**

Caches the output of a schema.

Hint: Primitive inputs are cached by value. Object and function inputs are
cached by reference identity, so mutating input objects and reusing the same
reference can return a stale cached dataset. Returned objects are also
reused by reference, so mutating cached output can affect later cache hits.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The schema to cache.

### Returns

[`SchemaWithCache`](../type-aliases/SchemaWithCache.md)\<`TSchema`, `undefined`\>

The cached schema.

## Call Signature

> **cache**\<`TSchema`, `TCacheConfig`\>(`schema`, `config`): [`SchemaWithCache`](../type-aliases/SchemaWithCache.md)\<`TSchema`, `TCacheConfig`\>

Defined in: node\_modules/valibot/dist/index.d.mts:104

**`Beta`**

Caches the output of a schema.

Hint: Primitive inputs are cached by value. Object and function inputs are
cached by reference identity, so mutating input objects and reusing the same
reference can return a stale cached dataset. Returned objects are also
reused by reference, so mutating cached output can affect later cache hits.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`SchemaWithCache`](../type-aliases/SchemaWithCache.md)\<`TSchema`, `TCacheConfig`\>

The cached schema.
