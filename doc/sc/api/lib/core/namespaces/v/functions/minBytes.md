[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minBytes

# Function: minBytes()

## Call Signature

> **minBytes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MinBytesAction`](../interfaces/MinBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12256

Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The minimum bytes.

### Returns

[`MinBytesAction`](../interfaces/MinBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A min bytes action.

## Call Signature

> **minBytes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MinBytesAction`](../interfaces/MinBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12265

Creates a min [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinBytesIssue`](../interfaces/MinBytesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The minimum bytes.

#### message

`TMessage`

The error message.

### Returns

[`MinBytesAction`](../interfaces/MinBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A min bytes action.
