[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / variant

# Function: variant()

## Call Signature

> **variant**\<`TKey$1`, `TOptions$1`\>(`key`, `options`): [`VariantSchema`](../interfaces/VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7545

Creates a variant schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* `string`

#### TOptions$1

`TOptions$1` *extends* [`VariantOptions`](../type-aliases/VariantOptions.md)\<`TKey$1`\>

### Parameters

#### key

`TKey$1`

The discriminator key.

#### options

`TOptions$1`

The variant options.

### Returns

[`VariantSchema`](../interfaces/VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

A variant schema.

## Call Signature

> **variant**\<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): [`VariantSchema`](../interfaces/VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7555

Creates a variant schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* `string`

#### TOptions$1

`TOptions$1` *extends* [`VariantOptions`](../type-aliases/VariantOptions.md)\<`TKey$1`\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`VariantIssue`](../interfaces/VariantIssue.md)\> \| `undefined`

### Parameters

#### key

`TKey$1`

The discriminator key.

#### options

`TOptions$1`

The variant options.

#### message

`TMessage`

The error message.

### Returns

[`VariantSchema`](../interfaces/VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

An variant schema.
