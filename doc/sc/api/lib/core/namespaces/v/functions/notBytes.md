[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notBytes

# Function: notBytes()

## Call Signature

> **notBytes**\<`TInput$1`, `TRequirement`\>(`requirement`): [`NotBytesAction`](../interfaces/NotBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12808

Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The not required bytes.

### Returns

[`NotBytesAction`](../interfaces/NotBytesAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A not bytes action.

## Call Signature

> **notBytes**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`NotBytesAction`](../interfaces/NotBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12817

Creates a not [bytes](https://en.wikipedia.org/wiki/Byte) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotBytesIssue`](../interfaces/NotBytesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The not required bytes.

#### message

`TMessage`

The error message.

### Returns

[`NotBytesAction`](../interfaces/NotBytesAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A not bytes action.
