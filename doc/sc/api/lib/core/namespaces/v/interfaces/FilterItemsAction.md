[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FilterItemsAction

# Interface: FilterItemsAction\<TInput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:9213

Filter items action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TInput$1`, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3178

**`Internal`**

Transforms known input values.

#### Parameters

##### dataset

[`SuccessDataset`](SuccessDataset.md)\<`TInput$1`\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The output dataset.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~run`](BaseTransformation.md#run)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3184

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `never`

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~types`](BaseTransformation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3167

Whether it's async.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`async`](BaseTransformation.md#async)

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### operation

> `readonly` **operation**: [`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9225

The filter items operation.

***

### reference

> `readonly` **reference**: \<`TInput$1`\>(`operation`) => `FilterItemsAction`\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9221

The action reference.

Creates a filter items transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

#### Parameters

##### operation

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The filter items operation.

#### Returns

`FilterItemsAction`\<`TInput$1`\>

A filter items action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"filter_items"`

Defined in: node\_modules/valibot/dist/index.d.mts:9217

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
