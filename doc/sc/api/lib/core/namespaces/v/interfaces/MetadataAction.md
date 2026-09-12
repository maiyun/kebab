[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MetadataAction

# Interface: MetadataAction\<TInput$1, TMetadata\>

Defined in: node\_modules/valibot/dist/index.d.mts:12102

Metadata action interface.

## Extends

- [`BaseMetadata`](BaseMetadata.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1`

### TMetadata

`TMetadata` *extends* `Record`\<`string`, `unknown`\>

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

### kind

> `readonly` **kind**: `"metadata"`

Defined in: node\_modules/valibot/dist/index.d.mts:2878

The object kind.

#### Inherited from

[`BaseMetadata`](BaseMetadata.md).[`kind`](BaseMetadata.md#kind)

***

### metadata

> `readonly` **metadata**: `TMetadata`

Defined in: node\_modules/valibot/dist/index.d.mts:12114

The metadata object.

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TMetadata`\>(`metadata_`) => `MetadataAction`\<`TInput$1`, `TMetadata`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12110

The action reference.

Creates a custom metadata action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TMetadata

`TMetadata` *extends* `Record`\<`string`, `unknown`\>

#### Parameters

##### metadata\_

`TMetadata`

The metadata object.

#### Returns

`MetadataAction`\<`TInput$1`, `TMetadata`\>

A metadata action.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`reference`](BaseMetadata.md#reference)

***

### type

> `readonly` **type**: `"metadata"`

Defined in: node\_modules/valibot/dist/index.d.mts:12106

The action type.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`type`](BaseMetadata.md#type)
