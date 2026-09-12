[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / hexColor

# Function: hexColor()

## Call Signature

> **hexColor**\<`TInput$1`\>(): [`HexColorAction`](../interfaces/HexColorAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9899

Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`HexColorAction`](../interfaces/HexColorAction.md)\<`TInput$1`, `undefined`\>

A hex color action.

## Call Signature

> **hexColor**\<`TInput$1`, `TMessage`\>(`message`): [`HexColorAction`](../interfaces/HexColorAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9907

Creates a [hex color](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`HexColorIssue`](../interfaces/HexColorIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`HexColorAction`](../interfaces/HexColorAction.md)\<`TInput$1`, `TMessage`\>

A hex color action.
