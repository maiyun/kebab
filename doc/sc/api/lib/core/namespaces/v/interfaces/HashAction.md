[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / HashAction

# Interface: HashAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:9668

Hash action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`HashIssue`](HashIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`HashIssue`](HashIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`HashIssue`](HashIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`HashIssue`](HashIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`HashIssue`](HashIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:9680

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

Defined in: node\_modules/valibot/dist/index.d.mts:9688

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`types`): `HashAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`types`, `message`): `HashAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:9676

The action reference.

#### Call Signature

> \<`TInput$1`\>(`types`): `HashAction`\<`TInput$1`, `undefined`\>

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Parameters

###### types

\[`"md4"` \| `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha384"` \| `"sha512"` \| `"ripemd128"` \| `"ripemd160"` \| `"tiger128"` \| `"tiger160"` \| `"tiger192"` \| `"crc32"` \| `"crc32b"` \| `"adler32"`, ...("md4" \| "md5" \| "sha1" \| "sha256" \| "sha384" \| "sha512" \| "ripemd128" \| "ripemd160" \| "tiger128" \| "tiger160" \| "tiger192" \| "crc32" \| "crc32b" \| "adler32")\[\]\]

The hash types.

##### Returns

`HashAction`\<`TInput$1`, `undefined`\>

A hash action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`types`, `message`): `HashAction`\<`TInput$1`, `TMessage`\>

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`HashIssue`](HashIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### types

\[`"md4"` \| `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha384"` \| `"sha512"` \| `"ripemd128"` \| `"ripemd160"` \| `"tiger128"` \| `"tiger160"` \| `"tiger192"` \| `"crc32"` \| `"crc32b"` \| `"adler32"`, ...("md4" \| "md5" \| "sha1" \| "sha256" \| "sha384" \| "sha512" \| "ripemd128" \| "ripemd160" \| "tiger128" \| "tiger160" \| "tiger192" \| "crc32" \| "crc32b" \| "adler32")\[\]\]

The hash types.

###### message

`TMessage`

The error message.

##### Returns

`HashAction`\<`TInput$1`, `TMessage`\>

A hash action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:9684

The hash regex.

***

### type

> `readonly` **type**: `"hash"`

Defined in: node\_modules/valibot/dist/index.d.mts:9672

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
