[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / PartialCheckActionAsync

# Interface: PartialCheckActionAsync\<TInput$1, TPaths, TSelection, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:14025

Partial check action async interface.

## Extends

- [`BaseValidationAsync`](BaseValidationAsync.md)\<`TInput$1`, `TInput$1`, [`PartialCheckIssue`](PartialCheckIssue.md)\<`TSelection`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `PartialInput`

### TPaths

`TPaths` *extends* `Paths`

### TSelection

`TSelection` *extends* `DeepPickN`\<`TInput$1`, `TPaths`\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PartialCheckIssue`](PartialCheckIssue.md)\<`TSelection`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`PartialCheckIssue`](PartialCheckIssue.md)\<`TSelection`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`PartialCheckIssue`](PartialCheckIssue.md)\<`TSelection`\>\>\>

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

> `readonly` **issue**: [`PartialCheckIssue`](PartialCheckIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:14037

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

Defined in: node\_modules/valibot/dist/index.d.mts:14049

The error message.

***

### paths

> `readonly` **paths**: `TPaths`

Defined in: node\_modules/valibot/dist/index.d.mts:14041

The selected paths.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TPaths`, `TSelection`\>(`paths`, `requirement`): `PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>; \<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>(`paths`, `requirement`, `message`): `PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:14033

The action reference.

#### Call Signature

> \<`TInput$1`, `TPaths`, `TSelection`\>(`paths`, `requirement`): `PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

Creates a partial check validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `PartialInput`

###### TPaths

`TPaths` *extends* `RequiredPaths`

###### TSelection

`TSelection` *extends* \{\[`key`: `string`\]: `never`; \} \| `never`[] \| \{\[`key`: `number`\]: `never`;
\[`key`: `string`\]: `unknown`; \}

##### Parameters

###### paths

`ValidPaths`\<`TInput$1`, `TPaths`\>

The selected paths.

###### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

##### Returns

`PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `undefined`\>

A partial check action.

#### Call Signature

> \<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>(`paths`, `requirement`, `message`): `PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

Creates a partial check validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `PartialInput`

###### TPaths

`TPaths` *extends* `RequiredPaths`

###### TSelection

`TSelection` *extends* \{\[`key`: `string`\]: `never`; \} \| `never`[] \| \{\[`key`: `number`\]: `never`;
\[`key`: `string`\]: `unknown`; \}

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PartialCheckIssue`](PartialCheckIssue.md)\<`TSelection`\>\> \| `undefined`

##### Parameters

###### paths

`ValidPaths`\<`TInput$1`, `TPaths`\>

The selected paths.

###### requirement

(`input`) => `MaybePromise`\<`boolean`\>

The validation function.

###### message

`TMessage`

The error message.

##### Returns

`PartialCheckActionAsync`\<`TInput$1`, `TPaths`, `TSelection`, `TMessage`\>

A partial check action.

#### Overrides

[`BaseValidationAsync`](BaseValidationAsync.md).[`reference`](BaseValidationAsync.md#reference)

***

### requirement

> `readonly` **requirement**: (`input`) => `MaybePromise`\<`boolean`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14045

The validation function.

#### Parameters

##### input

`TSelection`

#### Returns

`MaybePromise`\<`boolean`\>

***

### type

> `readonly` **type**: `"partial_check"`

Defined in: node\_modules/valibot/dist/index.d.mts:14029

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
