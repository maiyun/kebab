[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FlavorAction

# Interface: FlavorAction\<TInput$1, TName\>

Defined in: node\_modules/valibot/dist/index.d.mts:9359

**`Beta`**

Flavor action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TInput$1` & [`Flavor`](Flavor.md)\<`TName`\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1`

### TName

`TName` *extends* [`FlavorName`](../type-aliases/FlavorName.md)

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`Flavor`](Flavor.md)\<`TName`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`Flavor`](Flavor.md)\<`TName`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: `TInput$1` & [`Flavor`](Flavor.md)\<`TName`\>

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~types`](BaseTransformation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3167

**`Beta`**

Whether it's async.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`async`](BaseTransformation.md#async)

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

**`Beta`**

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### name

> `readonly` **name**: `TName`

Defined in: node\_modules/valibot/dist/index.d.mts:9371

**`Beta`**

The flavor name.

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TName`\>(`name`) => `FlavorAction`\<`TInput$1`, `TName`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9367

**`Beta`**

The action reference.

**`Beta`**

Creates a flavor transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TName

`TName` *extends* [`FlavorName`](../type-aliases/FlavorName.md)

#### Parameters

##### name

`TName`

The flavor name.

#### Returns

`FlavorAction`\<`TInput$1`, `TName`\>

A flavor action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"flavor"`

Defined in: node\_modules/valibot/dist/index.d.mts:9363

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
