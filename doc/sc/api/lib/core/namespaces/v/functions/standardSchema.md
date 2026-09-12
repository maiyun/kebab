[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / \_standardSchema

# Function: \_standardSchema()

> **\_standardSchema**\<`TSchema`\>(`schema`): `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:16457

**`Internal`**

Eagerly creates and attaches the Standard Schema properties of a schema.

Hint: The contextual `this` type includes the standard properties that are
attached before the schema is returned.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`Omit`\<`TSchema`, `"~standard"`\> & `ThisType`\<`TSchema`\>

The schema to attach standard properties to.

## Returns

`TSchema`

The schema with standard properties attached.
