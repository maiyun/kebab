[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ImeiAction

# Interface: ImeiAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:9938

IMEI action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`ImeiIssue`](ImeiIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ImeiIssue`](ImeiIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ImeiIssue`](ImeiIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ImeiIssue`](ImeiIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`ImeiIssue`](ImeiIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:9950

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

Defined in: node\_modules/valibot/dist/index.d.mts:9958

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `ImeiAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `ImeiAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:9946

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `ImeiAction`\<`TInput$1`, `undefined`\>

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

Formats:
- AABBBBBBCCCCCCD
- AA-BBBBBB-CCCCCC-D

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`ImeiAction`\<`TInput$1`, `undefined`\>

An IMEI action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `ImeiAction`\<`TInput$1`, `TMessage`\>

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

Formats:
- AABBBBBBCCCCCCD
- AA-BBBBBB-CCCCCC-D

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ImeiIssue`](ImeiIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`ImeiAction`\<`TInput$1`, `TMessage`\>

An IMEI action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: (`input`) => `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:9954

The validation function.

#### Parameters

##### input

`string`

#### Returns

`boolean`

***

### type

> `readonly` **type**: `"imei"`

Defined in: node\_modules/valibot/dist/index.d.mts:9942

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
