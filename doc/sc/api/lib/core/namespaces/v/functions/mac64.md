[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / mac64

# Function: mac64()

## Call Signature

> **mac64**\<`TInput$1`\>(): [`Mac64Action`](../interfaces/Mac64Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11495

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Mac64Action`](../interfaces/Mac64Action.md)\<`TInput$1`, `undefined`\>

A 64-bit MAC action.

## Call Signature

> **mac64**\<`TInput$1`, `TMessage`\>(`message`): [`Mac64Action`](../interfaces/Mac64Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11503

Creates a 64-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Mac64Issue`](../interfaces/Mac64Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Mac64Action`](../interfaces/Mac64Action.md)\<`TInput$1`, `TMessage`\>

A 64-bit MAC action.
