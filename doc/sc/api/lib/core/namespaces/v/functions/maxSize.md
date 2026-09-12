[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxSize

# Function: maxSize()

## Call Signature

> **maxSize**\<`TInput$1`, `TRequirement`\>(`requirement`): [`MaxSizeAction`](../interfaces/MaxSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11947

Creates a max size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### requirement

`TRequirement`

The maximum size.

### Returns

[`MaxSizeAction`](../interfaces/MaxSizeAction.md)\<`TInput$1`, `TRequirement`, `undefined`\>

A max size action.

## Call Signature

> **maxSize**\<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): [`MaxSizeAction`](../interfaces/MaxSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11956

Creates a max size validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxSizeIssue`](../interfaces/MaxSizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### requirement

`TRequirement`

The maximum size.

#### message

`TMessage`

The error message.

### Returns

[`MaxSizeAction`](../interfaces/MaxSizeAction.md)\<`TInput$1`, `TRequirement`, `TMessage`\>

A max size action.
