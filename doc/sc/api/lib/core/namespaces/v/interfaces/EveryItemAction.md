[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / EveryItemAction

# Interface: EveryItemAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:9144

Every item action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`EveryItemIssue`](EveryItemIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EveryItemIssue`](EveryItemIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`EveryItemIssue`](EveryItemIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`EveryItemIssue`](EveryItemIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`EveryItemIssue`](EveryItemIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:9156

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

Defined in: node\_modules/valibot/dist/index.d.mts:9164

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`requirement`): `EveryItemAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `EveryItemAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:9152

The action reference.

#### Call Signature

> \<`TInput$1`\>(`requirement`): `EveryItemAction`\<`TInput$1`, `undefined`\>

Creates an every item validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

##### Returns

`EveryItemAction`\<`TInput$1`, `undefined`\>

An every item action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `EveryItemAction`\<`TInput$1`, `TMessage`\>

Creates an every item validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EveryItemIssue`](EveryItemIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

###### message

`TMessage`

The error message.

##### Returns

`EveryItemAction`\<`TInput$1`, `TMessage`\>

An every item action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: [`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9160

The validation function.

***

### type

> `readonly` **type**: `"every_item"`

Defined in: node\_modules/valibot/dist/index.d.mts:9148

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
