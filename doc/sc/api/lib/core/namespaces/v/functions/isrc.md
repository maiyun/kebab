[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isrc

# Function: isrc()

## Call Signature

> **isrc**\<`TInput$1`\>(): [`IsrcAction`](../interfaces/IsrcAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10444

**`Beta`**

Creates an [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code) validation action.

Formats:
- CCXXXYYNNNNN
- CC-XXX-YY-NNNNN

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsrcAction`](../interfaces/IsrcAction.md)\<`TInput$1`, `undefined`\>

An ISRC action.

## Call Signature

> **isrc**\<`TInput$1`, `TMessage`\>(`message`): [`IsrcAction`](../interfaces/IsrcAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10454

**`Beta`**

Creates an [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code) validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsrcIssue`](../interfaces/IsrcIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsrcAction`](../interfaces/IsrcAction.md)\<`TInput$1`, `TMessage`\>

An ISRC action.
