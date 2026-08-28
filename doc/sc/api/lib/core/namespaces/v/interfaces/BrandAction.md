[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BrandAction

# Interface: BrandAction\<TInput$1, TName\>

Defined in: node\_modules/valibot/dist/index.d.mts:7963

Brand action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TInput$1` & [`Brand`](Brand.md)\<`TName`\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1`

### TName

`TName` *extends* [`BrandName`](../type-aliases/BrandName.md)

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`Brand`](Brand.md)\<`TName`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`Brand`](Brand.md)\<`TName`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: `TInput$1` & [`Brand`](Brand.md)\<`TName`\>

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

### name

> `readonly` **name**: `TName`

Defined in: node\_modules/valibot/dist/index.d.mts:7975

The brand name.

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TName`\>(`name`) => `BrandAction`\<`TInput$1`, `TName`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7971

The action reference.

Creates a brand transformation action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TName

`TName` *extends* [`BrandName`](../type-aliases/BrandName.md)

#### Parameters

##### name

`TName`

The brand name.

#### Returns

`BrandAction`\<`TInput$1`, `TName`\>

A brand action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"brand"`

Defined in: node\_modules/valibot/dist/index.d.mts:7967

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
