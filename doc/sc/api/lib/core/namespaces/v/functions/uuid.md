[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / uuid

# Function: uuid()

## Call Signature

> **uuid**\<`TInput$1`\>(): [`UuidAction`](../interfaces/UuidAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15406

Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`UuidAction`](../interfaces/UuidAction.md)\<`TInput$1`, `undefined`\>

An UUID action.

## Call Signature

> **uuid**\<`TInput$1`, `TMessage`\>(`message`): [`UuidAction`](../interfaces/UuidAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15414

Creates an [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UuidIssue`](../interfaces/UuidIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`UuidAction`](../interfaces/UuidAction.md)\<`TInput$1`, `TMessage`\>

An UUID action.
