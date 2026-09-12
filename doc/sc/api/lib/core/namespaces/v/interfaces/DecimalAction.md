[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / DecimalAction

# Interface: DecimalAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:8545

Decimal action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`DecimalIssue`](DecimalIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`DecimalIssue`](DecimalIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`DecimalIssue`](DecimalIssue.md)\<`TInput$1`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3258

**`Internal`**

Validates known input values.

#### Parameters

##### dataset

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`DecimalIssue`](DecimalIssue.md)\<`TInput$1`\>\>

The output dataset.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~run`](BaseValidation.md#run)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3264

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`DecimalIssue`](DecimalIssue.md)

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~types`](BaseValidation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

Whether it's async.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`async`](BaseValidation.md#async)

***

### expects

> `readonly` **expects**: `null`

Defined in: node\_modules/valibot/dist/index.d.mts:8557

The expected property.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`expects`](BaseValidation.md#expects)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

The object kind.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`kind`](BaseValidation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:8565

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `DecimalAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `DecimalAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:8553

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `DecimalAction`\<`TInput$1`, `undefined`\>

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

The difference between `decimal` and `digits` is that `decimal` accepts
floating point numbers and negative numbers, while `digits` accepts only the
digits 0-9.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`DecimalAction`\<`TInput$1`, `undefined`\>

An decimal action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `DecimalAction`\<`TInput$1`, `TMessage`\>

Creates a [decimal](https://en.wikipedia.org/wiki/Decimal) validation action.

The difference between `decimal` and `digits` is that `decimal` accepts
floating point numbers and negative numbers, while `digits` accepts only the
digits 0-9.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`DecimalIssue`](DecimalIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`DecimalAction`\<`TInput$1`, `TMessage`\>

An decimal action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:8561

The decimal regex.

***

### type

> `readonly` **type**: `"decimal"`

Defined in: node\_modules/valibot/dist/index.d.mts:8549

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
