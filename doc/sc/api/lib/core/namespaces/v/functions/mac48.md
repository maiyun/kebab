[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / mac48

# Function: mac48()

## Call Signature

> **mac48**\<`TInput$1`\>(): [`Mac48Action`](../interfaces/Mac48Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11294

Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Mac48Action`](../interfaces/Mac48Action.md)\<`TInput$1`, `undefined`\>

A 48-bit MAC action.

## Call Signature

> **mac48**\<`TInput$1`, `TMessage`\>(`message`): [`Mac48Action`](../interfaces/Mac48Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11302

Creates a 48-bit [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Mac48Issue`](../interfaces/Mac48Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Mac48Action`](../interfaces/Mac48Action.md)\<`TInput$1`, `TMessage`\>

A 48-bit MAC action.
