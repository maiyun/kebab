[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / assert

# Function: assert()

> **assert**\<`TSchema`\>(`schema`, `input`): `asserts input is InferInput<TSchema>`

Defined in: node\_modules/valibot/dist/index.d.mts:9

Checks if the input matches the schema. As this is an assertion function, it
can be used as a type guard.

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

`asserts input is InferInput<TSchema>`
