[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseTransformationAsync

# Interface: BaseTransformationAsync\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3193

Base transformation async interface.

## Extends

- `Omit`\<[`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TOutput$1`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

## Extended by

- [`AwaitActionAsync`](AwaitActionAsync.md)
- [`RawTransformActionAsync`](RawTransformActionAsync.md)
- [`TransformActionAsync`](TransformActionAsync.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>\>

The output dataset.

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3184

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `TIssue`

#### output

> `readonly` **output**: `TOutput$1`

#### Inherited from

`Omit.~types`

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3201

Whether it's async.

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### reference

> `readonly` **reference**: (...`args`) => [`BaseTransformation`](BaseTransformation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseTransformationAsync`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3197

The transformation reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseTransformation`](BaseTransformation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseTransformationAsync`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3159

The transformation type.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
