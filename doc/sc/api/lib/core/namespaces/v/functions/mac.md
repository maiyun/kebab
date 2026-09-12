[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / mac

# Function: mac()

## Call Signature

> **mac**\<`TInput$1`\>(): [`MacAction`](../interfaces/MacAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11363

Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`MacAction`](../interfaces/MacAction.md)\<`TInput$1`, `undefined`\>

A MAC action.

## Call Signature

> **mac**\<`TInput$1`, `TMessage`\>(`message`): [`MacAction`](../interfaces/MacAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11371

Creates a [MAC address](https://en.wikipedia.org/wiki/MAC_address) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MacIssue`](../interfaces/MacIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`MacAction`](../interfaces/MacAction.md)\<`TInput$1`, `TMessage`\>

A MAC action.
