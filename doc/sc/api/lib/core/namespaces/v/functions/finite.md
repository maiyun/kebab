[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / finite

# Function: finite()

## Call Signature

> **finite**\<`TInput$1`\>(): [`FiniteAction`](../interfaces/FiniteAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9392

Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

### Returns

[`FiniteAction`](../interfaces/FiniteAction.md)\<`TInput$1`, `undefined`\>

A finite action.

## Call Signature

> **finite**\<`TInput$1`, `TMessage`\>(`message`): [`FiniteAction`](../interfaces/FiniteAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9400

Creates a [finite](https://en.wikipedia.org/wiki/Finite) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`FiniteIssue`](../interfaces/FiniteIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`FiniteAction`](../interfaces/FiniteAction.md)\<`TInput$1`, `TMessage`\>

A finite action.
