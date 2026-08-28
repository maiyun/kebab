[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / is

# Function: is()

> **is**\<`TSchema`\>(`schema`, `input`): `input is InferInput<TSchema>`

Defined in: node\_modules/valibot/dist/index.d.mts:1395

Checks if the input matches the schema. By using a type predicate, this
function can be used as a type guard.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### schema

`TSchema`

The schema to be used.

### input

`unknown`

The input to be tested.

## Returns

`input is InferInput<TSchema>`

Whether the input matches the schema.
