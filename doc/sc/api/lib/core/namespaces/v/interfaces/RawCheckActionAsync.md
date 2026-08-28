[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RawCheckActionAsync

# Interface: RawCheckActionAsync\<TInput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:13798

Raw check action async interface.

## Extends

- [`BaseValidationAsync`](BaseValidationAsync.md)\<`TInput$1`, `TInput$1`, [`RawCheckIssue`](RawCheckIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawCheckIssue`](RawCheckIssue.md)\<`TInput$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RawCheckIssue`](RawCheckIssue.md)\<`TInput$1`\>\>\>

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

> `readonly` **issue**: [`RawCheckIssue`](RawCheckIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:13810

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

### reference

> `readonly` **reference**: \<`TInput$1`\>(`action`) => `RawCheckActionAsync`\<`TInput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13806

The action reference.

Creates a raw check validation action.

#### Type Parameters

##### TInput$1

`TInput$1`

#### Parameters

##### action

(`context`) => `MaybePromise`\<`void`\>

The validation action.

#### Returns

`RawCheckActionAsync`\<`TInput$1`\>

A raw check action.

#### Overrides

[`BaseValidationAsync`](BaseValidationAsync.md).[`reference`](BaseValidationAsync.md#reference)

***

### type

> `readonly` **type**: `"raw_check"`

Defined in: node\_modules/valibot/dist/index.d.mts:13802

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
