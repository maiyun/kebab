[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RfcEmailAction

# Interface: RfcEmailAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:14123

RFC email action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`RfcEmailIssue`](RfcEmailIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RfcEmailIssue`](RfcEmailIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RfcEmailIssue`](RfcEmailIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`RfcEmailIssue`](RfcEmailIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`RfcEmailIssue`](RfcEmailIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:14135

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

Defined in: node\_modules/valibot/dist/index.d.mts:14143

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `RfcEmailAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `RfcEmailAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:14131

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `RfcEmailAction`\<`TInput$1`, `undefined`\>

Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
validation action.

Hint: This validation action uses the regex defined by the HTML Living
Standard for `<input type="email">`, which covers most of RFC 5322 but
not all of it. For example, quoted local parts and comments are not
supported. If you are interested in an action that only validates common
email addresses, please use the `email` action instead.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`RfcEmailAction`\<`TInput$1`, `undefined`\>

A RFC email action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `RfcEmailAction`\<`TInput$1`, `TMessage`\>

Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
validation action.

Hint: This validation action uses the regex defined by the HTML Living
Standard for `<input type="email">`, which covers most of RFC 5322 but
not all of it. For example, quoted local parts and comments are not
supported. If you are interested in an action that only validates common
email addresses, please use the `email` action instead.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RfcEmailIssue`](RfcEmailIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`RfcEmailAction`\<`TInput$1`, `TMessage`\>

A RFC email action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:14139

The RFC email regex.

***

### type

> `readonly` **type**: `"rfc_email"`

Defined in: node\_modules/valibot/dist/index.d.mts:14127

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
