[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / DescriptionAction

# Interface: DescriptionAction\<TInput$1, TDescription\>

Defined in: node\_modules/valibot/dist/index.d.mts:8594

Description action interface.

## Extends

- [`BaseMetadata`](BaseMetadata.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1`

### TDescription

`TDescription` *extends* `string`

## Properties

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:2892

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `never`

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseMetadata`](BaseMetadata.md).[`~types`](BaseMetadata.md#types)

***

### description

> `readonly` **description**: `TDescription`

Defined in: node\_modules/valibot/dist/index.d.mts:8606

The description text.

***

### kind

> `readonly` **kind**: `"metadata"`

Defined in: node\_modules/valibot/dist/index.d.mts:2878

The object kind.

#### Inherited from

[`BaseMetadata`](BaseMetadata.md).[`kind`](BaseMetadata.md#kind)

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TDescription`\>(`description_`) => `DescriptionAction`\<`TInput$1`, `TDescription`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8602

The action reference.

Creates a description metadata action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TDescription

`TDescription` *extends* `string`

#### Parameters

##### description\_

`TDescription`

The description text.

#### Returns

`DescriptionAction`\<`TInput$1`, `TDescription`\>

A description action.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`reference`](BaseMetadata.md#reference)

***

### type

> `readonly` **type**: `"description"`

Defined in: node\_modules/valibot/dist/index.d.mts:8598

The action type.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`type`](BaseMetadata.md#type)
