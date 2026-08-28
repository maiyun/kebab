[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / CheckItemsAction

# Interface: CheckItemsAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:8231

Check items action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`CheckItemsIssue`](CheckItemsIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:8243

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

Defined in: node\_modules/valibot/dist/index.d.mts:8251

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`requirement`): `CheckItemsAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `CheckItemsAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:8239

The action reference.

#### Call Signature

> \<`TInput$1`\>(`requirement`): `CheckItemsAction`\<`TInput$1`, `undefined`\>

Creates an check items validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

##### Returns

`CheckItemsAction`\<`TInput$1`, `undefined`\>

An check items action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `CheckItemsAction`\<`TInput$1`, `TMessage`\>

Creates an check items validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### requirement

[`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

The validation function.

###### message

`TMessage`

The error message.

##### Returns

`CheckItemsAction`\<`TInput$1`, `TMessage`\>

An check items action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: [`ArrayRequirement`](../type-aliases/ArrayRequirement.md)\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8247

The validation function.

***

### type

> `readonly` **type**: `"check_items"`

Defined in: node\_modules/valibot/dist/index.d.mts:8235

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
