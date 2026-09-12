[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ToCamelCaseAction

# Interface: ToCamelCaseAction

Defined in: node\_modules/valibot/dist/index.d.mts:15057

**`Beta`**

To camel case action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`string`, `string`, `never`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3178

**`Internal`**

Transforms known input values.

#### Parameters

##### dataset

[`SuccessDataset`](SuccessDataset.md)\<`string`\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **input**: `string`

#### issue

> `readonly` **issue**: `never`

#### output

> `readonly` **output**: `string`

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

### reference

> `readonly` **reference**: () => `ToCamelCaseAction`

Defined in: node\_modules/valibot/dist/index.d.mts:15065

**`Beta`**

The action reference.

**`Beta`**

Creates a to camel case transformation action.

Words are separated by `_`, `-` and ASCII whitespace, as well as by case
and acronym boundaries.

Hint: Acronym runs are normalized to lowercase (e.g. `parseURLValue` →
`parseUrlValue`) and digits stay attached to the preceding token (e.g.
`item2Name` → `item2Name`).

#### Returns

`ToCamelCaseAction`

A to camel case action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"to_camel_case"`

Defined in: node\_modules/valibot/dist/index.d.mts:15061

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
