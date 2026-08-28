[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RawTransformActionAsync

# Interface: RawTransformActionAsync\<TInput$1, TOutput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:13887

Raw transform action async interface.

## Extends

- [`BaseTransformationAsync`](BaseTransformationAsync.md)\<`TInput$1`, `TOutput$1`, [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3212

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawTransformIssue`](RawTransformIssue.md)\<`TInput$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`~run`](BaseTransformationAsync.md#run)

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

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`~types`](BaseTransformationAsync.md#types)

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3201

Whether it's async.

#### Inherited from

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`async`](BaseTransformationAsync.md#async)

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TOutput$1`\>(`action`) => `RawTransformActionAsync`\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13895

The action reference.

Creates a raw transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TOutput$1

`TOutput$1`

#### Parameters

##### action

(`context`) => `MaybePromise`\<`TOutput$1`\>

The transformation action.

#### Returns

`RawTransformActionAsync`\<`TInput$1`, `TOutput$1`\>

A raw transform action.

#### Overrides

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`reference`](BaseTransformationAsync.md#reference)

***

### type

> `readonly` **type**: `"raw_transform"`

Defined in: node\_modules/valibot/dist/index.d.mts:13891

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
