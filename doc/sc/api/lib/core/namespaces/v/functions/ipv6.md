[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ipv6

# Function: ipv6()

## Call Signature

> **ipv6**\<`TInput$1`\>(): [`Ipv6Action`](../interfaces/Ipv6Action.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10233

Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`Ipv6Action`](../interfaces/Ipv6Action.md)\<`TInput$1`, `undefined`\>

An IPv6 action.

## Call Signature

> **ipv6**\<`TInput$1`, `TMessage`\>(`message`): [`Ipv6Action`](../interfaces/Ipv6Action.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10241

Creates an [IPv6](https://en.wikipedia.org/wiki/IPv6) address validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`Ipv6Issue`](../interfaces/Ipv6Issue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`Ipv6Action`](../interfaces/Ipv6Action.md)\<`TInput$1`, `TMessage`\>

An IPv6 action.
