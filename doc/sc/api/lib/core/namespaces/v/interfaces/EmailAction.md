[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / EmailAction

# Interface: EmailAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:8802

Email action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`EmailIssue`](EmailIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EmailIssue`](EmailIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`EmailIssue`](EmailIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`EmailIssue`](EmailIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`EmailIssue`](EmailIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:8814

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

Defined in: node\_modules/valibot/dist/index.d.mts:8822

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `EmailAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `EmailAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:8810

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `EmailAction`\<`TInput$1`, `undefined`\>

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
action.

Hint: This validation action intentionally only validates common email
addresses. If you are interested in an action that covers a broader
subset of RFC 5322 addresses, please use the `rfcEmail` action instead.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`EmailAction`\<`TInput$1`, `undefined`\>

An email action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `EmailAction`\<`TInput$1`, `TMessage`\>

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
action.

Hint: This validation action intentionally only validates common email
addresses. If you are interested in an action that covers a broader
subset of RFC 5322 addresses, please use the `rfcEmail` action instead.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EmailIssue`](EmailIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`EmailAction`\<`TInput$1`, `TMessage`\>

An email action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:8818

The email regex.

***

### type

> `readonly` **type**: `"email"`

Defined in: node\_modules/valibot/dist/index.d.mts:8806

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
