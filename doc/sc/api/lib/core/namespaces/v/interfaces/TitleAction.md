[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / TitleAction

# Interface: TitleAction\<TInput$1, TTitle\>

Defined in: node\_modules/valibot/dist/index.d.mts:1343

Title action interface.

## Extends

- [`BaseMetadata`](BaseMetadata.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1`

### TTitle

`TTitle` *extends* `string`

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

### reference

> `readonly` **reference**: \<`TInput$1`, `TTitle`\>(`title_`) => `TitleAction`\<`TInput$1`, `TTitle`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1351

The action reference.

Creates a title metadata action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TTitle

`TTitle` *extends* `string`

#### Parameters

##### title\_

`TTitle`

The title text.

#### Returns

`TitleAction`\<`TInput$1`, `TTitle`\>

A title action.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`reference`](BaseMetadata.md#reference)

***

### title

> `readonly` **title**: `TTitle`

Defined in: node\_modules/valibot/dist/index.d.mts:1355

The title text.

***

### type

> `readonly` **type**: `"title"`

Defined in: node\_modules/valibot/dist/index.d.mts:1347

The action type.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`type`](BaseMetadata.md#type)
