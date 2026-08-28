[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / toSnakeCase

# Function: toSnakeCase()

> **toSnakeCase**(): [`ToSnakeCaseAction`](../interfaces/ToSnakeCaseAction.md)

Defined in: node\_modules/valibot/dist/index.d.mts:15018

**`Beta`**

Creates a to snake case transformation action.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries.

Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
`parse_url_value`) and digits stay attached to the preceding token (e.g.
`item2Name` → `item2_name`).

## Returns

[`ToSnakeCaseAction`](../interfaces/ToSnakeCaseAction.md)

A to snake case action.
