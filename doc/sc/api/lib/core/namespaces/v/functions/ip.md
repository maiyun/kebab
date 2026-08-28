[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ip

# Function: ip()

## Call Signature

> **ip**\<`TInput$1`\>(): [`IpAction`](../interfaces/IpAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10101

Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IpAction`](../interfaces/IpAction.md)\<`TInput$1`, `undefined`\>

An IP action.

## Call Signature

> **ip**\<`TInput$1`, `TMessage`\>(`message`): [`IpAction`](../interfaces/IpAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10109

Creates an [IP address](https://en.wikipedia.org/wiki/IP_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IpIssue`](../interfaces/IpIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IpAction`](../interfaces/IpAction.md)\<`TInput$1`, `TMessage`\>

An IP action.
