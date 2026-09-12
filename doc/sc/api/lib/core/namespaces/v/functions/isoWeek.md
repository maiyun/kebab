[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoWeek

# Function: isoWeek()

## Call Signature

> **isoWeek**\<`TInput$1`\>(): [`IsoWeekAction`](../interfaces/IsoWeekAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11008

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-Www

Hint: The regex used cannot validate the maximum number of weeks based on
the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoWeekAction`](../interfaces/IsoWeekAction.md)\<`TInput$1`, `undefined`\>

An ISO week action.

## Call Signature

> **isoWeek**\<`TInput$1`, `TMessage`\>(`message`): [`IsoWeekAction`](../interfaces/IsoWeekAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11021

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-Www

Hint: The regex used cannot validate the maximum number of weeks based on
the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoWeekIssue`](../interfaces/IsoWeekIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoWeekAction`](../interfaces/IsoWeekAction.md)\<`TInput$1`, `TMessage`\>

An ISO week action.
