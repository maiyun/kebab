[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RawTransformAction

# Interface: RawTransformAction\<TInput$1, TOutput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:14206

Raw transform action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TOutput$1`, [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`RawTransformIssue`](RawTransformIssue.md)

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

### reference

> `readonly` **reference**: \<`TInput$1`, `TOutput$1`\>(`action`) => `RawTransformAction`\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14214

The action reference.

Creates a raw transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TOutput$1

`TOutput$1`

#### Parameters

##### action

(`context`) => `TOutput$1`

The transformation action.

#### Returns

`RawTransformAction`\<`TInput$1`, `TOutput$1`\>

A raw transform action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"raw_transform"`

Defined in: node\_modules/valibot/dist/index.d.mts:14210

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
