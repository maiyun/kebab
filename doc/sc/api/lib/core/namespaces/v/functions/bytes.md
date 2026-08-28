[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / bytes

# Function: bytes()

## Call Signature

> **bytes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`BytesAction`](../interfaces/BytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8044

Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The required bytes.

### Returns

[`BytesAction`](../interfaces/BytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A bytes action.

## Call Signature

> **bytes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`BytesAction`](../interfaces/BytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8053

Creates a [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BytesIssue`](../interfaces/BytesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The required bytes.

#### message

`TMessage`

The error message.

### Returns

[`BytesAction`](../interfaces/BytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A bytes action.
