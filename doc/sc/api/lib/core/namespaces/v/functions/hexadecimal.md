[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / hexadecimal

# Function: hexadecimal()

## Call Signature

> **hexadecimal**\<`TInput$1`\>(): [`HexadecimalAction`](../interfaces/HexadecimalAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9833

Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`HexadecimalAction`](../interfaces/HexadecimalAction.md)\<`TInput$1`, `undefined`\>

A hexadecimal action.

## Call Signature

> **hexadecimal**\<`TInput$1`, `TMessage`\>(`message`): [`HexadecimalAction`](../interfaces/HexadecimalAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9841

Creates a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`HexadecimalIssue`](../interfaces/HexadecimalIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`HexadecimalAction`](../interfaces/HexadecimalAction.md)\<`TInput$1`, `TMessage`\>

A hexadecimal action.
