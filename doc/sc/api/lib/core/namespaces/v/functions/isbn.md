[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isbn

# Function: isbn()

## Call Signature

> **isbn**\<`TInput$1`\>(): [`IsbnAction`](../interfaces/IsbnAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10370

**`Beta`**

Creates an [ISBN](https://en.wikipedia.org/wiki/ISBN) action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsbnAction`](../interfaces/IsbnAction.md)\<`TInput$1`, `undefined`\>

An ISBN action.

## Call Signature

> **isbn**\<`TInput$1`, `TMessage`\>(`message`): [`IsbnAction`](../interfaces/IsbnAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10380

**`Beta`**

Creates an [ISBN](https://en.wikipedia.org/wiki/ISBN) action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsbnIssue`](../interfaces/IsbnIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsbnAction`](../interfaces/IsbnAction.md)\<`TInput$1`, `TMessage`\>

An ISBN action.
