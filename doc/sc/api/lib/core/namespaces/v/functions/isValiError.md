[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isValiError

# Function: isValiError()

> **isValiError**\<`TSchema`\>(`error`): `error is ValiError<TSchema>`

Defined in: node\_modules/valibot/dist/index.d.mts:16577

A type guard to check if an error is a ValiError.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Parameters

### error

`unknown`

The error to check.

## Returns

`error is ValiError<TSchema>`

Whether its a ValiError.
