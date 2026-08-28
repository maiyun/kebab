[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / AwaitActionAsync

# Interface: AwaitActionAsync\<TInput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:7796

Await action async interface.

## Extends

- [`BaseTransformationAsync`](BaseTransformationAsync.md)\<`TInput$1`, `Awaited`\<`TInput$1`\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `Promise`\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`Awaited`\<`TInput$1`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`Awaited`\<`TInput$1`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>\>

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

> `readonly` **output**: `Awaited`

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

> `readonly` **reference**: \<`TInput$1`\>() => `AwaitActionAsync`\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7804

The action reference.

Creates an await transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* `Promise`\<`unknown`\>

#### Returns

`AwaitActionAsync`\<`TInput$1`\>

An await action.

#### Overrides

[`BaseTransformationAsync`](BaseTransformationAsync.md).[`reference`](BaseTransformationAsync.md#reference)

***

### type

> `readonly` **type**: `"await"`

Defined in: node\_modules/valibot/dist/index.d.mts:7800

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
