[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / base64

# Function: base64()

## Call Signature

> **base64**\<`TInput$1`\>(): [`Base64Action`](../interfaces/Base64Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7869

Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Base64Action`](../interfaces/Base64Action.md)\<`TInput$1`, `undefined`\>

A Base64 action.

## Call Signature

> **base64**\<`TInput$1`, `TMessage`\>(`message`): [`Base64Action`](../interfaces/Base64Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:7877

Creates a [Base64](https://en.wikipedia.org/wiki/Base64) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Base64Issue`](../interfaces/Base64Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Base64Action`](../interfaces/Base64Action.md)\<`TInput$1`, `TMessage`\>

A Base64 action.
