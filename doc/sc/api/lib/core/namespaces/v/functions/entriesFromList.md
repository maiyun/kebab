[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / entriesFromList

# Function: entriesFromList()

> **entriesFromList**\<`TList`, `TSchema`\>(`list`, `schema`): `Record`\<`TList`\[`number`\], `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:16480

Creates an object entries definition from a list of keys and a schema.

## Type Parameters

### TList

`TList` *extends* readonly (`string` \| `number` \| `symbol`)[]

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### list

`TList`

A list of keys.

### schema

`TSchema`

The schema of the keys.

## Returns

`Record`\<`TList`\[`number`\], `TSchema`\>

The object entries.
