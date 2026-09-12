[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ExamplesAction

# Interface: ExamplesAction\<TInput$1, TExamples\>

Defined in: node\_modules/valibot/dist/index.d.mts:9188

Examples action interface.

## Extends

- [`BaseMetadata`](BaseMetadata.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1`

### TExamples

`TExamples` *extends* readonly `TInput$1`[]

## Properties

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:2892

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `never`

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseMetadata`](BaseMetadata.md).[`~types`](BaseMetadata.md#types)

***

### examples

> `readonly` **examples**: `TExamples`

Defined in: node\_modules/valibot/dist/index.d.mts:9200

The examples.

***

### kind

> `readonly` **kind**: `"metadata"`

Defined in: node\_modules/valibot/dist/index.d.mts:2878

The object kind.

#### Inherited from

[`BaseMetadata`](BaseMetadata.md).[`kind`](BaseMetadata.md#kind)

***

### reference

> `readonly` **reference**: \<`TInput$1`, `TExamples`\>(`examples_`) => `ExamplesAction`\<`TInput$1`, `TExamples`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9196

The action reference.

**`Beta`**

Creates an examples metadata action.

#### Type Parameters

##### TInput$1

`TInput$1`

##### TExamples

`TExamples` *extends* readonly `TInput$1`[]

#### Parameters

##### examples\_

`TExamples`

The examples.

#### Returns

`ExamplesAction`\<`TInput$1`, `TExamples`\>

An examples action.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`reference`](BaseMetadata.md#reference)

***

### type

> `readonly` **type**: `"examples"`

Defined in: node\_modules/valibot/dist/index.d.mts:9192

The action type.

#### Overrides

[`BaseMetadata`](BaseMetadata.md).[`type`](BaseMetadata.md#type)
