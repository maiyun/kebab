[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ReturnsActionAsync

# Interface: ReturnsActionAsync\<TInput$1, TSchema\>

Defined in: node\_modules/valibot/dist/index.d.mts:14071

Returns action async type.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, (...`args`) => `Promise`\<`Awaited`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>\>, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `Promise`\<`Awaited`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `Promise`\<`Awaited`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: (...`args`) => `Promise`\<`Awaited`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>\>

##### Parameters

###### args

...`Parameters`\<`TInput$1`\>

##### Returns

`Promise`\<`Awaited`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>\>\>

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

> `readonly` **reference**: \<`TInput$1`, `TSchema`\>(`schema`) => `ReturnsActionAsync`\<`TInput$1`, `TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14079

The action reference.

Creates a function arguments transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* (...`args`) => `unknown`

##### TSchema

`TSchema` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### schema

`TSchema`

The arguments schema.

#### Returns

`ReturnsActionAsync`\<`TInput$1`, `TSchema`\>

An returns action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### schema

> `readonly` **schema**: `TSchema`

Defined in: node\_modules/valibot/dist/index.d.mts:14083

The arguments schema.

***

### type

> `readonly` **type**: `"returns"`

Defined in: node\_modules/valibot/dist/index.d.mts:14075

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
