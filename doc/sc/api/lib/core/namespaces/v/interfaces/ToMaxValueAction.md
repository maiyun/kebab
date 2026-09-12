[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ToMaxValueAction

# Interface: ToMaxValueAction\<TInput$1, TRequirement\>

Defined in: node\_modules/valibot/dist/index.d.mts:15194

To max value action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TInput$1`, `never`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### TRequirement

`TRequirement` *extends* `TInput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **output**: `TInput$1`

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

> `readonly` **reference**: \<`TInput$1`, `TRequirement`\>(`requirement`) => `ToMaxValueAction`\<`TInput$1`, `TRequirement`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15202

The action reference.

Creates a to max value transformation action.

#### Type Parameters

##### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

##### TRequirement

`TRequirement` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

#### Parameters

##### requirement

`TRequirement`

The maximum value.

#### Returns

`ToMaxValueAction`\<`TInput$1`, `TRequirement`\>

A to max value action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:15206

The maximum value.

***

### type

> `readonly` **type**: `"to_max_value"`

Defined in: node\_modules/valibot/dist/index.d.mts:15198

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
