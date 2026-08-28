[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ArgsAction

# Interface: ArgsAction\<TInput$1, TSchema\>

Defined in: node\_modules/valibot/dist/index.d.mts:7738

Args action type.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, (...`args`) => `ReturnType`\<`TInput$1`\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

### TSchema

`TSchema` *extends* `Schema$3`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `ReturnType`\<`TInput$1`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `ReturnType`\<`TInput$1`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: (...`args`) => `ReturnType`\<`TInput$1`\>

##### Parameters

###### args

...[`InferInput`](../type-aliases/InferInput.md)\<`TSchema`\>

##### Returns

`ReturnType`\<`TInput$1`\>

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

> `readonly` **reference**: \<`TInput$1`, `TSchema`\>(`schema`) => `ArgsAction`\<`TInput$1`, `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7746

The action reference.

Creates a function arguments transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

##### TSchema

`TSchema` *extends* `Schema$3`

#### Parameters

##### schema

`TSchema`

The arguments schema.

#### Returns

`ArgsAction`\<`TInput$1`, `TSchema`\>

An args action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:7750

The arguments schema.

***

### type

> `readonly` **type**: `"args"`

Defined in: node\_modules/valibot/dist/index.d.mts:7742

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
