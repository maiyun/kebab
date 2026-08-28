[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nanoid

# Function: nanoid()

## Call Signature

> **nanoid**\<`TInput$1`\>(): [`NanoIdAction`](../interfaces/NanoIdAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12645

Creates a [Nano ID](https://github.com/ai/nanoid) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`NanoIdAction`](../interfaces/NanoIdAction.md)\<`TInput$1`, `undefined`\>

A Nano ID action.

## Call Signature

> **nanoid**\<`TInput$1`, `TMessage`\>(`message`): [`NanoIdAction`](../interfaces/NanoIdAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12653

Creates a [Nano ID](https://github.com/ai/nanoid) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NanoIdIssue`](../interfaces/NanoIdIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`NanoIdAction`](../interfaces/NanoIdAction.md)\<`TInput$1`, `TMessage`\>

A Nano ID action.
