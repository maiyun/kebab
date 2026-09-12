[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoDate

# Function: isoDate()

## Call Signature

> **isoDate**\<`TInput$1`\>(): [`IsoDateAction`](../interfaces/IsoDateAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10518

Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-dd

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31" is valid although June has only
30 days.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoDateAction`](../interfaces/IsoDateAction.md)\<`TInput$1`, `undefined`\>

An ISO date action.

## Call Signature

> **isoDate**\<`TInput$1`, `TMessage`\>(`message`): [`IsoDateAction`](../interfaces/IsoDateAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10532

Creates an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-dd

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31" is valid although June has only
30 days.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoDateIssue`](../interfaces/IsoDateIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoDateAction`](../interfaces/IsoDateAction.md)\<`TInput$1`, `TMessage`\>

An ISO date action.
