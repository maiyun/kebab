[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ipv4

# Function: ipv4()

## Call Signature

> **ipv4**\<`TInput$1`\>(): [`Ipv4Action`](../interfaces/Ipv4Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10236

Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Ipv4Action`](../interfaces/Ipv4Action.md)\<`TInput$1`, `undefined`\>

An IPv4 action.

## Call Signature

> **ipv4**\<`TInput$1`, `TMessage`\>(`message`): [`Ipv4Action`](../interfaces/Ipv4Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10244

Creates an [IPv4](https://en.wikipedia.org/wiki/IPv4) address validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Ipv4Issue`](../interfaces/Ipv4Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Ipv4Action`](../interfaces/Ipv4Action.md)\<`TInput$1`, `TMessage`\>

An IPv4 action.
