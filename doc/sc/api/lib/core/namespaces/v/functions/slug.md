[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / slug

# Function: slug()

## Call Signature

> **slug**\<`TInput$1`\>(): [`SlugAction`](../interfaces/SlugAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14365

Creates a [slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`SlugAction`](../interfaces/SlugAction.md)\<`TInput$1`, `undefined`\>

A slug action.

## Call Signature

> **slug**\<`TInput$1`, `TMessage`\>(`message`): [`SlugAction`](../interfaces/SlugAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14373

Creates a [slug](https://en.wikipedia.org/wiki/Clean_URL#Slug) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SlugIssue`](../interfaces/SlugIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`SlugAction`](../interfaces/SlugAction.md)\<`TInput$1`, `TMessage`\>

A slug action.
