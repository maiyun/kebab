[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isOfKind

# Function: isOfKind()

> **isOfKind**\<`TKind`, `TObject`\>(`kind`, `object`): `object is Extract<TObject, { kind: TKind }>`

Defined in: node\_modules/valibot/dist/index.d.mts:16531

A generic type guard to check the kind of an object.

## Type Parameters

### TKind

`TKind` *extends* `string`

### TObject

`TObject` *extends* `object`

## Parameters

### kind

`TKind`

The kind to check for.

### object

`TObject`

The object to check.

## Returns

`object is Extract<TObject, { kind: TKind }>`

Whether it matches.
