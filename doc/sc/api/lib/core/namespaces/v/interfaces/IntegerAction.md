[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IntegerAction

# Interface: IntegerAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:10077

Integer action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`IntegerIssue`](IntegerIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntegerIssue`](IntegerIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IntegerIssue`](IntegerIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IntegerIssue`](IntegerIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`IntegerIssue`](IntegerIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:10089

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

Defined in: node\_modules/valibot/dist/index.d.mts:10097

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `IntegerAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `IntegerAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:10085

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `IntegerAction`\<`TInput$1`, `undefined`\>

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `number`

##### Returns

`IntegerAction`\<`TInput$1`, `undefined`\>

An integer action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `IntegerAction`\<`TInput$1`, `TMessage`\>

Creates an [integer](https://en.wikipedia.org/wiki/Integer) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntegerIssue`](IntegerIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`IntegerAction`\<`TInput$1`, `TMessage`\>

An integer action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: (`input`) => `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:10093

The validation function.

#### Parameters

##### input

`number`

#### Returns

`boolean`

***

### type

> `readonly` **type**: `"integer"`

Defined in: node\_modules/valibot/dist/index.d.mts:10081

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
