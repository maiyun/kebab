[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isOfType

# Function: isOfType()

> **isOfType**\<`TType`, `TObject`\>(`type`, `object`): `object is Extract<TObject, { type: TType }>`

Defined in: node\_modules/valibot/dist/index.d.mts:16151

A generic type guard to check the type of an object.

## Type Parameters

### TType

`TType` *extends* `string`

### TObject

`TObject` *extends* `object`

## Parameters

### type

`TType`

The type to check for.

### object

`TObject`

The object to check.

## Returns

`object is Extract<TObject, { type: TType }>`

Whether it matches.
