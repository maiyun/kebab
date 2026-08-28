[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / octal

# Function: octal()

## Call Signature

> **octal**\<`TInput$1`\>(): [`OctalAction`](../interfaces/OctalAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13364

Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`OctalAction`](../interfaces/OctalAction.md)\<`TInput$1`, `undefined`\>

An octal action.

## Call Signature

> **octal**\<`TInput$1`, `TMessage`\>(`message`): [`OctalAction`](../interfaces/OctalAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13372

Creates an [octal](https://en.wikipedia.org/wiki/Octal) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`OctalIssue`](../interfaces/OctalIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`OctalAction`](../interfaces/OctalAction.md)\<`TInput$1`, `TMessage`\>

An octal action.
