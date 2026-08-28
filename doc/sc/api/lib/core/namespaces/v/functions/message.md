[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / message

# Function: message()

> **message**\<`TSchema`\>(`schema`, `message_`): `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:1437

Changes the local message configuration of a schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The schema to configure.

### message\_

[`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>\>

The error message.

## Returns

`TSchema`

The configured schema.
