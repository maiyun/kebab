[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / toCamelCase

# Function: toCamelCase()

> **toCamelCase**(): [`ToCamelCaseAction`](../interfaces/ToCamelCaseAction.md)

Defined in: node\_modules/valibot/dist/index.d.mts:14739

**`Beta`**

Creates a to camel case transformation action.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries.

Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
`parseUrlValue`) and digits stay attached to the preceding token (e.g.
`item2Name` → `item2Name`).

## Returns

[`ToCamelCaseAction`](../interfaces/ToCamelCaseAction.md)

A to camel case action.
