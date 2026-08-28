[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getMetadata

# Function: getMetadata()

> **getMetadata**\<`TSchema`\>(`schema`): [`InferMetadata`](../type-aliases/InferMetadata.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1337

**`Beta`**

Returns the metadata of a schema.

If multiple metadata are defined, it shallowly merges them using depth-first
search. If no metadata is defined, an empty object is returned.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$12`

## Parameters

### schema

`TSchema`

Schema to get the metadata from.

## Returns

[`InferMetadata`](../type-aliases/InferMetadata.md)\<`TSchema`\>

The metadata, if any.
