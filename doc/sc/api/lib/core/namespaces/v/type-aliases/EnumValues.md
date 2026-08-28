[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / EnumValues

# Type Alias: EnumValues\<TEnum\>

> **EnumValues**\<`TEnum`\> = \{ \[TKey in keyof TEnum\]: TKey extends number ? TEnum\[TKey\] extends string ? TEnum\[TEnum\[TKey\]\] extends TKey ? never : TEnum\[TKey\] : TEnum\[TKey\] : TKey extends "NaN" \| "Infinity" \| "-Infinity" ? TEnum\[TKey\] extends string ? TEnum\[TEnum\[TKey\]\] extends number ? never : TEnum\[TKey\] : TEnum\[TKey\] : TKey extends \`+$\{number\}\` ? TEnum\[TKey\] : TKey extends \`$\{infer TNumber extends number\}\` ? TEnum\[TKey\] extends string ? TEnum\[TEnum\[TKey\]\] extends TNumber ? never : TEnum\[TKey\] : TEnum\[TKey\] : TEnum\[TKey\] \}\[keyof `TEnum`\]

Defined in: node\_modules/valibot/dist/index.d.mts:4241

Enum values type.

## Type Parameters

### TEnum

`TEnum` *extends* [`Enum`](../interfaces/Enum.md)
