[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / Mac64Action

# Interface: Mac64Action\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:11468

64-bit MAC action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`Mac64Issue`](Mac64Issue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Mac64Issue`](Mac64Issue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`Mac64Issue`](Mac64Issue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`Mac64Issue`](Mac64Issue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`Mac64Issue`](Mac64Issue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:11480

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

Defined in: node\_modules/valibot/dist/index.d.mts:11488

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `Mac64Action`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `Mac64Action`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:11476

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `Mac64Action`\<`TInput$1`, `undefined`\>

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`Mac64Action`\<`TInput$1`, `undefined`\>

A 64-bit MAC action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `Mac64Action`\<`TInput$1`, `TMessage`\>

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Mac64Issue`](Mac64Issue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`Mac64Action`\<`TInput$1`, `TMessage`\>

A 64-bit MAC action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:11484

The 64-bit MAC regex.

***

### type

> `readonly` **type**: `"mac64"`

Defined in: node\_modules/valibot/dist/index.d.mts:11472

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
