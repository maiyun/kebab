[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseMetadata

# Interface: BaseMetadata\<TInput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:2874

Base metadata interface.

## Extended by

- [`DescriptionAction`](DescriptionAction.md)
- [`ExamplesAction`](ExamplesAction.md)
- [`MetadataAction`](MetadataAction.md)
- [`TitleAction`](TitleAction.md)

## Type Parameters

### TInput$1

`TInput$1`

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

***

### kind

> `readonly` **kind**: `"metadata"`

Defined in: node\_modules/valibot/dist/index.d.mts:2878

The object kind.

***

### reference

> `readonly` **reference**: (...`args`) => `BaseMetadata`\<`any`\>

Defined in: node\_modules/valibot/dist/index.d.mts:2886

The metadata reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseMetadata`\<`any`\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:2882

The metadata type.
