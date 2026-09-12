[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / TransformAction

# Interface: TransformAction\<TInput$1, TOutput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:15441

Transform action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TOutput$1`, `never`\>

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: `TOutput$1`

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

> `readonly` **operation**: (`input`) => `TOutput$1`

Defined in: node\_modules/valibot/dist/index.d.mts:15453

The transformation operation.

#### Parameters

##### input

`TInput$1`

#### Returns

`TOutput$1`

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TOutput$1`\>(`operation`) => `TransformAction`\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15449

The action reference.

Creates a custom transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TOutput$1

`TOutput$1`

#### Parameters

##### operation

(`input`) => `TOutput$1`

The transformation operation.

#### Returns

`TransformAction`\<`TInput$1`, `TOutput$1`\>

A transform action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"transform"`

Defined in: node\_modules/valibot/dist/index.d.mts:15445

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
