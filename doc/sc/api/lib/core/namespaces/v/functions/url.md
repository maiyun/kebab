[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / url

# Function: url()

## Call Signature

> **url**\<`TInput$1`\>(): [`UrlAction`](../interfaces/UrlAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15337

Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.

Hint: The value is passed to the URL constructor to check if it is valid.
This check is not perfect. For example, values like "abc:1234" are accepted.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`UrlAction`](../interfaces/UrlAction.md)\<`TInput$1`, `undefined`\>

An URL action.

## Call Signature

> **url**\<`TInput$1`, `TMessage`\>(`message`): [`UrlAction`](../interfaces/UrlAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15348

Creates an [URL](https://en.wikipedia.org/wiki/URL) validation action.

Hint: The value is passed to the URL constructor to check if it is valid.
This check is not perfect. For example, values like "abc:1234" are accepted.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UrlIssue`](../interfaces/UrlIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`UrlAction`](../interfaces/UrlAction.md)\<`TInput$1`, `TMessage`\>

An URL action.
