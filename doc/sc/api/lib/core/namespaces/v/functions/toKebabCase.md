[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / toKebabCase

# Function: toKebabCase()

> **toKebabCase**(): [`ToKebabCaseAction`](../interfaces/ToKebabCaseAction.md)

Defined in: node\_modules/valibot/dist/index.d.mts:15167

**`Beta`**

Creates a to kebab case transformation action.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries.

Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
`parse-url-value`) and digits stay attached to the preceding token (e.g.
`item2Name` → `item2-name`).

## Returns

[`ToKebabCaseAction`](../interfaces/ToKebabCaseAction.md)

A to kebab case action.
