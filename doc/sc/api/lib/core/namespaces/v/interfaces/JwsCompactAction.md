[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / JwsCompactAction

# Interface: JwsCompactAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:11056

**`Beta`**

JWS compact action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`JwsCompactIssue`](JwsCompactIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`JwsCompactIssue`](JwsCompactIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`JwsCompactIssue`](JwsCompactIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`JwsCompactIssue`](JwsCompactIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`JwsCompactIssue`](JwsCompactIssue.md)

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~types`](BaseValidation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

**`Beta`**

Whether it's async.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`async`](BaseValidation.md#async)

***

### expects

> `readonly` **expects**: `null`

Defined in: node\_modules/valibot/dist/index.d.mts:11068

**`Beta`**

The expected property.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`expects`](BaseValidation.md#expects)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

**`Beta`**

The object kind.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`kind`](BaseValidation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:11076

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `JwsCompactAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `JwsCompactAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:11064

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `JwsCompactAction`\<`TInput$1`, `undefined`\>

**`Beta`**

Creates a [JWS compact serialization](https://datatracker.ietf.org/doc/html/rfc7515#section-3.1)
validation action.

Hint: This validation action only checks the three-part compact string shape
with unpadded Base64URL-like segments. It does not decode the segments,
verify the signature, or validate claims.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`JwsCompactAction`\<`TInput$1`, `undefined`\>

A JWS compact action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `JwsCompactAction`\<`TInput$1`, `TMessage`\>

**`Beta`**

Creates a [JWS compact serialization](https://datatracker.ietf.org/doc/html/rfc7515#section-3.1)
validation action.

Hint: This validation action only checks the three-part compact string shape
with unpadded Base64URL-like segments. It does not decode the segments,
verify the signature, or validate claims.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`JwsCompactIssue`](JwsCompactIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`JwsCompactAction`\<`TInput$1`, `TMessage`\>

A JWS compact action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:11072

**`Beta`**

The JWS compact regex.

***

### type

> `readonly` **type**: `"jws_compact"`

Defined in: node\_modules/valibot/dist/index.d.mts:11060

**`Beta`**

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
