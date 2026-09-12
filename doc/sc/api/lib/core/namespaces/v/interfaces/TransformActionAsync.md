[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / TransformActionAsync

# Interface: TransformActionAsync\<TInput$1, TOutput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:15468

Transform action async interface.

## Extends

- [`BaseTransformationAsync`](BaseTransformationAsync.md)\<`TInput$1`, `TOutput$1`, `never`\>

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>\>

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

> `readonly` **issue**: `never`

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

### operation

> `readonly` **operation**: (`input`) => `Promise`\<`TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15480

The transformation operation.

#### Parameters

##### input

`TInput$1`

#### Returns

`Promise`\<`TOutput$1`\>

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TOutput$1`\>(`operation`) => `TransformActionAsync`\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15476

The action reference.

Creates a custom transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TOutput$1

`TOutput$1`

#### Parameters

##### operation

(`input`) => `Promise`\<`TOutput$1`\>

The transformation operation.

#### Returns

`TransformActionAsync`\<`TInput$1`, `TOutput$1`\>

A transform action.

#### Overrides

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`reference`](BaseTransformationAsync.md#reference)

***

### type

> `readonly` **type**: `"transform"`

Defined in: node\_modules/valibot/dist/index.d.mts:15472

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
