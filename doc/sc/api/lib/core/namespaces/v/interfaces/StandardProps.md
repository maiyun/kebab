[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / StandardProps

# Interface: StandardProps\<TInput$1, TOutput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:2981

The Standard Schema properties interface.

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

## Properties

### types?

> `readonly` `optional` **types?**: `StandardTypes`\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2997

Inferred types associated with the schema.

***

### validate

> `readonly` **validate**: (`value`) => `StandardResult`\<`TOutput$1`\> \| `Promise`\<`StandardResult`\<`TOutput$1`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:2993

Validates unknown input values.

#### Parameters

##### value

`unknown`

#### Returns

`StandardResult`\<`TOutput$1`\> \| `Promise`\<`StandardResult`\<`TOutput$1`\>\>

***

### vendor

> `readonly` **vendor**: `"valibot"`

Defined in: node\_modules/valibot/dist/index.d.mts:2989

The vendor name of the schema library.

***

### version

> `readonly` **version**: `1`

Defined in: node\_modules/valibot/dist/index.d.mts:2985

The version number of the standard.
