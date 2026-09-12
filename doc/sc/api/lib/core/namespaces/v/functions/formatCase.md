[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / \_formatCase

# Function: \_formatCase()

> **\_formatCase**(`input`, `separator`, `capFirst`, `capRest`): `string`

Defined in: node\_modules/valibot/dist/index.d.mts:16305

**`Internal`**

Splits a string into lowercase words and rejoins them with the given
separator and capitalization rules.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries. Whether the first or subsequent words are
capitalized is controlled by `capFirst` and `capRest`.

Hint: Implemented in a single pass that emits directly to the result
string to avoid an intermediate `string[]` allocation. ASCII chars are
classified via char codes to skip `.toLowerCase()` and `.toUpperCase()`
method calls in the common case.

Hint: Digits are treated as a separate character class, so `item2Name`
yields `item2` and `name` rather than `item`, `2` and `name`.

## Parameters

### input

`string`

The input string.

### separator

`string`

The string inserted between words.

### capFirst

`boolean`

Whether to capitalize the first word.

### capRest

`boolean`

Whether to capitalize subsequent words.

## Returns

`string`

The formatted string.
