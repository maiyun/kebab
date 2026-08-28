[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / variantAsync

# Function: variantAsync()

## Call Signature

> **variantAsync**\<`TKey$1`, `TOptions$1`\>(`key`, `options`): [`VariantSchemaAsync`](../interfaces/VariantSchemaAsync.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7595

Creates a variant schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* `string`

#### TOptions$1

`TOptions$1` *extends* [`VariantOptionsAsync`](../type-aliases/VariantOptionsAsync.md)\<`TKey$1`\>

### Parameters

#### key

`TKey$1`

The discriminator key.

#### options

`TOptions$1`

The variant options.

### Returns

[`VariantSchemaAsync`](../interfaces/VariantSchemaAsync.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

A variant schema.

## Call Signature

> **variantAsync**\<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): [`VariantSchemaAsync`](../interfaces/VariantSchemaAsync.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7605

Creates a variant schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* `string`

#### TOptions$1

`TOptions$1` *extends* [`VariantOptionsAsync`](../type-aliases/VariantOptionsAsync.md)\<`TKey$1`\>

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

[`VariantSchemaAsync`](../interfaces/VariantSchemaAsync.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

An variant schema.
