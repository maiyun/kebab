[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxBytes

# Function: maxBytes()

## Call Signature

> **maxBytes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxBytesAction`](../interfaces/MaxBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11594

Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum bytes.

### Returns

[`MaxBytesAction`](../interfaces/MaxBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max bytes action.

## Call Signature

> **maxBytes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxBytesAction`](../interfaces/MaxBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11603

Creates a max [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxBytesIssue`](../interfaces/MaxBytesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum bytes.

#### message

`TMessage`

The error message.

### Returns

[`MaxBytesAction`](../interfaces/MaxBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max bytes action.
