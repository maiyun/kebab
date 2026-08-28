[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SomeItemAction

# Interface: SomeItemAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:14400

Some item action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`SomeItemIssue`](SomeItemIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SomeItemIssue`](SomeItemIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`SomeItemIssue`](SomeItemIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`SomeItemIssue`](SomeItemIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`SomeItemIssue`](SomeItemIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:14412

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

Defined in: node\_modules/valibot/dist/index.d.mts:14420

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`requirement`): `SomeItemAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `SomeItemAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:14408

The action reference.

#### Call Signature

> \<`TInput$1`\>(`requirement`): `SomeItemAction`\<`TInput$1`, `undefined`\>

Creates a some item validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

##### Returns

`SomeItemAction`\<`TInput$1`, `undefined`\>

A some item action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `SomeItemAction`\<`TInput$1`, `TMessage`\>

Creates a some item validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SomeItemIssue`](SomeItemIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

###### message

`TMessage`

The error message.

##### Returns

`SomeItemAction`\<`TInput$1`, `TMessage`\>

A some item action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: [`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14416

The validation function.

***

### type

> `readonly` **type**: `"some_item"`

Defined in: node\_modules/valibot/dist/index.d.mts:14404

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
