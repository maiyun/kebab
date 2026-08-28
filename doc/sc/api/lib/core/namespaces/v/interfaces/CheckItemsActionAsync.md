[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / CheckItemsActionAsync

# Interface: CheckItemsActionAsync\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:8275

Check items action async interface.

## Extends

- [`BaseValidationAsync`](BaseValidationAsync.md)\<`TInput$1`, `TInput$1`, [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3292

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseValidationAsync`](BaseValidationAsync.md).[`~run`](BaseValidationAsync.md#run)

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

[`BaseValidationAsync`](BaseValidationAsync.md).[`~types`](BaseValidationAsync.md#types)

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3281

Whether it's async.

#### Inherited from

[`BaseValidationAsync`](BaseValidationAsync.md).[`async`](BaseValidationAsync.md#async)

***

### expects

> `readonly` **expects**: `null`

Defined in: node\_modules/valibot/dist/index.d.mts:8287

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

Defined in: node\_modules/valibot/dist/index.d.mts:8295

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`requirement`): `CheckItemsActionAsync`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `CheckItemsActionAsync`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:8283

The action reference.

#### Call Signature

> \<`TInput$1`\>(`requirement`): `CheckItemsActionAsync`\<`TInput$1`, `undefined`\>

Creates a check items validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

##### Parameters

###### requirement

[`ArrayRequirementAsync`](../type-aliases/ArrayRequirementAsync.md)\<`TInput$1`\>

The validation function.

##### Returns

`CheckItemsActionAsync`\<`TInput$1`, `undefined`\>

A check items action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`requirement`, `message`): `CheckItemsActionAsync`\<`TInput$1`, `TMessage`\>

Creates a check items validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ArrayInput`](../type-aliases/ArrayInput.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CheckItemsIssue`](CheckItemsIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### requirement

[`ArrayRequirementAsync`](../type-aliases/ArrayRequirementAsync.md)\<`TInput$1`\>

The validation function.

###### message

`TMessage`

The error message.

##### Returns

`CheckItemsActionAsync`\<`TInput$1`, `TMessage`\>

A check items action.

#### Overrides

[`BaseValidationAsync`](BaseValidationAsync.md).[`reference`](BaseValidationAsync.md#reference)

***

### requirement

> `readonly` **requirement**: [`ArrayRequirementAsync`](../type-aliases/ArrayRequirementAsync.md)\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8291

The validation function.

***

### type

> `readonly` **type**: `"check_items"`

Defined in: node\_modules/valibot/dist/index.d.mts:8279

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
