[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ulid

# Function: ulid()

## Call Signature

> **ulid**\<`TInput$1`\>(): [`UlidAction`](../interfaces/UlidAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15610

Creates an [ULID](https://github.com/ulid/spec) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`UlidAction`](../interfaces/UlidAction.md)\<`TInput$1`, `undefined`\>

An ULID action.

## Call Signature

> **ulid**\<`TInput$1`, `TMessage`\>(`message`): [`UlidAction`](../interfaces/UlidAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15618

Creates an [ULID](https://github.com/ulid/spec) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UlidIssue`](../interfaces/UlidIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`UlidAction`](../interfaces/UlidAction.md)\<`TInput$1`, `TMessage`\>

An ULID action.
