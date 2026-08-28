[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / toPascalCase

# Function: toPascalCase()

> **toPascalCase**(): [`ToPascalCaseAction`](../interfaces/ToPascalCaseAction.md)

Defined in: node\_modules/valibot/dist/index.d.mts:14986

**`Beta`**

Creates a to pascal case transformation action.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries.

Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
`ParseUrlValue`) and digits stay attached to the preceding token (e.g.
`item2Name` → `Item2Name`).

## Returns

[`ToPascalCaseAction`](../interfaces/ToPascalCaseAction.md)

A to pascal case action.
