[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / entriesFromObjects

# Function: entriesFromObjects()

> **entriesFromObjects**\<`TSchemas`\>(`schemas`): \{ \[TKey in string \| number \| symbol\]: RecursiveMerge\<TSchemas\>\[TKey\] \}

Defined in: node\_modules/valibot/dist/index.d.mts:16107

Creates a new object entries definition from existing object schemas.

## Type Parameters

### TSchemas

`TSchemas` *extends* readonly \[`Schema`, `Schema`\]

## Parameters

### schemas

`TSchemas`

The schemas to merge the entries from.

## Returns

\{ \[TKey in string \| number \| symbol\]: RecursiveMerge\<TSchemas\>\[TKey\] \}

The object entries from the schemas.
