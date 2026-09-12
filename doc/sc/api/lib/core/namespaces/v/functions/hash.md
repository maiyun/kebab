[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / hash

# Function: hash()

## Call Signature

> **hash**\<`TInput$1`\>(`types`): [`HashAction`](../interfaces/HashAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9766

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Parameters

#### types

\[`"md4"` \| `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha384"` \| `"sha512"` \| `"ripemd128"` \| `"ripemd160"` \| `"tiger128"` \| `"tiger160"` \| `"tiger192"` \| `"crc32"` \| `"crc32b"` \| `"adler32"`, ...("md4" \| "md5" \| "sha1" \| "sha256" \| "sha384" \| "sha512" \| "ripemd128" \| "ripemd160" \| "tiger128" \| "tiger160" \| "tiger192" \| "crc32" \| "crc32b" \| "adler32")\[\]\]

The hash types.

### Returns

[`HashAction`](../interfaces/HashAction.md)\<`TInput$1`, `undefined`\>

A hash action.

## Call Signature

> **hash**\<`TInput$1`, `TMessage`\>(`types`, `message`): [`HashAction`](../interfaces/HashAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9775

Creates a [hash](https://en.wikipedia.org/wiki/Hash_function) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`HashIssue`](../interfaces/HashIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### types

\[`"md4"` \| `"md5"` \| `"sha1"` \| `"sha256"` \| `"sha384"` \| `"sha512"` \| `"ripemd128"` \| `"ripemd160"` \| `"tiger128"` \| `"tiger160"` \| `"tiger192"` \| `"crc32"` \| `"crc32b"` \| `"adler32"`, ...("md4" \| "md5" \| "sha1" \| "sha256" \| "sha384" \| "sha512" \| "ripemd128" \| "ripemd160" \| "tiger128" \| "tiger160" \| "tiger192" \| "crc32" \| "crc32b" \| "adler32")\[\]\]

The hash types.

#### message

`TMessage`

The error message.

### Returns

[`HashAction`](../interfaces/HashAction.md)\<`TInput$1`, `TMessage`\>

A hash action.
