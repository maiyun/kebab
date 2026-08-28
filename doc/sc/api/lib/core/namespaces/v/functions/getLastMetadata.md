[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / \_getLastMetadata

# Function: \_getLastMetadata()

> **\_getLastMetadata**(`schema`, `type`): `string` \| `undefined`

Defined in: node\_modules/valibot/dist/index.d.mts:16000

**`Internal`**

Returns the last top-level value of a given metadata type from a schema
using a breadth-first search that starts with the last item in the pipeline.

## Parameters

### schema

`Schema$1`

The schema to search.

### type

`"title"` \| `"description"`

The metadata type.

## Returns

`string` \| `undefined`

The value, if any.
