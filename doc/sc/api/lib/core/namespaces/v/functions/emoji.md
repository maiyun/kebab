[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / emoji

# Function: emoji()

## Call Signature

> **emoji**\<`TInput$1`\>(): [`EmojiAction`](../interfaces/EmojiAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8905

Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`EmojiAction`](../interfaces/EmojiAction.md)\<`TInput$1`, `undefined`\>

An emoji action.

## Call Signature

> **emoji**\<`TInput$1`, `TMessage`\>(`message`): [`EmojiAction`](../interfaces/EmojiAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8913

Creates an [emoji](https://en.wikipedia.org/wiki/Emoji) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EmojiIssue`](../interfaces/EmojiIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`EmojiAction`](../interfaces/EmojiAction.md)\<`TInput$1`, `TMessage`\>

An emoji action.
