[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getDotPath

# Function: getDotPath()

## Call Signature

> **getDotPath**(`issue`): `string` \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:16117

Creates and returns the dot path of an issue if possible.

### Parameters

#### issue

[`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>

The issue to get the dot path from.

### Returns

`string` \| `null`

The dot path or null.

## Call Signature

> **getDotPath**\<`TSchema`\>(`issue`): [`IssueDotPath`](../type-aliases/IssueDotPath.md)\<`TSchema`\> \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:16125

Creates and returns the dot path of an issue if possible.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### issue

[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>

The issue to get the dot path from.

### Returns

[`IssueDotPath`](../type-aliases/IssueDotPath.md)\<`TSchema`\> \| `null`

The dot path or null.
