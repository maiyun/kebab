[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoTime

# Function: isoTime()

## Call Signature

> **isoTime**\<`TInput$1`\>(): [`IsoTimeAction`](../interfaces/IsoTimeAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10760

Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: hh:mm

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoTimeAction`](../interfaces/IsoTimeAction.md)\<`TInput$1`, `undefined`\>

An ISO time action.

## Call Signature

> **isoTime**\<`TInput$1`, `TMessage`\>(`message`): [`IsoTimeAction`](../interfaces/IsoTimeAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10770

Creates an [ISO time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: hh:mm

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoTimeIssue`](../interfaces/IsoTimeIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoTimeAction`](../interfaces/IsoTimeAction.md)\<`TInput$1`, `TMessage`\>

An ISO time action.
