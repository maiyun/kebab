[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoTimeSecond

# Function: isoTimeSecond()

## Call Signature

> **isoTimeSecond**\<`TInput$1`\>(): [`IsoTimeSecondAction`](../interfaces/IsoTimeSecondAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10761

Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: hh:mm:ss

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoTimeSecondAction`](../interfaces/IsoTimeSecondAction.md)\<`TInput$1`, `undefined`\>

An ISO time second action.

## Call Signature

> **isoTimeSecond**\<`TInput$1`, `TMessage`\>(`message`): [`IsoTimeSecondAction`](../interfaces/IsoTimeSecondAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10771

Creates an [ISO time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: hh:mm:ss

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoTimeSecondIssue`](../interfaces/IsoTimeSecondIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoTimeSecondAction`](../interfaces/IsoTimeSecondAction.md)\<`TInput$1`, `TMessage`\>

An ISO time second action.
