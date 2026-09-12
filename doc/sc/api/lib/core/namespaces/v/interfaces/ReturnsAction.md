[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ReturnsAction

# Interface: ReturnsAction\<TInput$1, TSchema\>

Defined in: node\_modules/valibot/dist/index.d.mts:14386

Returns action type.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, (...`args`) => [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: (...`args`) => [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

##### Parameters

###### args

...`Parameters`\<`TInput$1`\>

##### Returns

[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>

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

> `readonly` **reference**: \<`TInput$1`, `TSchema`\>(`schema`) => `ReturnsAction`\<`TInput$1`, `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14394

The action reference.

Creates a function return transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

##### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### schema

`TSchema`

The arguments schema.

#### Returns

`ReturnsAction`\<`TInput$1`, `TSchema`\>

An returns action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:14398

The arguments schema.

***

### type

> `readonly` **type**: `"returns"`

Defined in: node\_modules/valibot/dist/index.d.mts:14390

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
