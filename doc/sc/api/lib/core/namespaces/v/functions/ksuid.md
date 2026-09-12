[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ksuid

# Function: ksuid()

## Call Signature

> **ksuid**\<`TInput$1`\>(): [`KsuidAction`](../interfaces/KsuidAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11163

Creates a [KSUID](https://github.com/segmentio/ksuid) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`KsuidAction`](../interfaces/KsuidAction.md)\<`TInput$1`, `undefined`\>

A KSUID action.

## Call Signature

> **ksuid**\<`TInput$1`, `TMessage`\>(`message`): [`KsuidAction`](../interfaces/KsuidAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11171

Creates a [KSUID](https://github.com/segmentio/ksuid) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`KsuidIssue`](../interfaces/KsuidIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`KsuidAction`](../interfaces/KsuidAction.md)\<`TInput$1`, `TMessage`\>

A KSUID action.
