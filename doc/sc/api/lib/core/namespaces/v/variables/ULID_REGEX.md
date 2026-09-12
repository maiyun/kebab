[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ULID\_REGEX

# Variable: ULID\_REGEX

> `const` **ULID\_REGEX**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:16123

[ULID](https://github.com/ulid/spec) regex.

Hint: We decided against the `i` flag for better JSON Schema compatibility.
Hint: The first character is restricted to `[0-7]` because the 48-bit
timestamp cannot exceed 2^48-1, making the maximum valid ULID
`7ZZZZZZZZZZZZZZZZZZZZZZZZZ` in Crockford's Base32 encoding.
