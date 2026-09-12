[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / mimeType

# Function: mimeType()

## Call Signature

> **mimeType**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MimeTypeAction`](../interfaces/MimeTypeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12187

Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `Blob`

#### TRequirement

`TRequirement` *extends* `Requirement`

### Parameters

#### requirement

`TRequirement`

The MIME types.

### Returns

[`MimeTypeAction`](../interfaces/MimeTypeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A MIME type action.

## Call Signature

> **mimeType**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MimeTypeAction`](../interfaces/MimeTypeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12196

Creates a [MIME type](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `Blob`

#### TRequirement

`TRequirement` *extends* `Requirement`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MimeTypeIssue`](../interfaces/MimeTypeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The MIME types.

#### message

`TMessage`

The error message.

### Returns

[`MimeTypeAction`](../interfaces/MimeTypeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A MIME type action.
