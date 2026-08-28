[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseValidationAsync

# Interface: BaseValidationAsync\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3273

Base validation async interface.

## Extends

- `Omit`\<[`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TOutput$1`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

## Extended by

- [`CheckActionAsync`](CheckActionAsync.md)
- [`CheckItemsActionAsync`](CheckItemsActionAsync.md)
- [`PartialCheckActionAsync`](PartialCheckActionAsync.md)
- [`RawCheckActionAsync`](RawCheckActionAsync.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>\>

The output dataset.

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3264

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `TIssue`

#### output

> `readonly` **output**: `TOutput$1`

#### Inherited from

`Omit.~types`

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3281

Whether it's async.

***

### expects

> `readonly` **expects**: `string` \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:3243

The expected property.

#### Inherited from

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

> `readonly` **reference**: (...`args`) => [`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseValidationAsync`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3277

The validation reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseValidationAsync`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3235

The validation type.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
