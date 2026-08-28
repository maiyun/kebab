[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FindItemAction

# Interface: FindItemAction\<TInput$1, TOuput\>

Defined in: node\_modules/valibot/dist/index.d.mts:9244

Find item action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TOuput` \| `undefined`, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### TOuput

`TOuput` *extends* `TInput$1`\[`number`\]

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOuput` \| `undefined`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOuput` \| `undefined`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: `TOuput` \| `undefined`

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

> `readonly` **operation**: `ArrayRequirement$1`\<`TInput$1`, `TOuput`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9256

The find item operation.

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TOuput`\>(`operation`) => `FindItemAction`\<`TInput$1`, `TOuput`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9252

The action reference.

Creates a find item transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

##### TOuput

`TOuput` *extends* `unknown`

#### Parameters

##### operation

`ArrayRequirement$1`\<`TInput$1`, `TOuput`\>

The find item operation.

#### Returns

`FindItemAction`\<`TInput$1`, `TOuput`\>

A find item action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"find_item"`

Defined in: node\_modules/valibot/dist/index.d.mts:9248

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
