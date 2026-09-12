[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ToDateAction

# Interface: ToDateAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:15104

To date action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `Date`, [`ToDateIssue`](ToDateIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ToDateIssue`](ToDateIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`Date`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ToDateIssue`](ToDateIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`Date`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ToDateIssue`](ToDateIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`ToDateIssue`](ToDateIssue.md)

#### output

> `readonly` **output**: `Date`

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

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:15116

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `ToDateAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `ToDateAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:15112

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `ToDateAction`\<`TInput$1`, `undefined`\>

**`Beta`**

Creates a to date transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

##### Returns

`ToDateAction`\<`TInput$1`, `undefined`\>

A to date action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `ToDateAction`\<`TInput$1`, `TMessage`\>

**`Beta`**

Creates a to date transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ToDateIssue`](ToDateIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`ToDateAction`\<`TInput$1`, `TMessage`\>

A to date action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"to_date"`

Defined in: node\_modules/valibot/dist/index.d.mts:15108

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
