[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoTimestamp

# Function: isoTimestamp()

## Call Signature

> **isoTimestamp**\<`TInput$1`\>(): [`IsoTimestampAction`](../interfaces/IsoTimestampAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10848

Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation
action.

Formats:
- yyyy-mm-ddThh:mm:ss.sssZ
- yyyy-mm-ddThh:mm:ss.sss±hh:mm
- yyyy-mm-ddThh:mm:ss.sss±hhmm

Hint: To support timestamps with lower or higher accuracy, the millisecond
specification can be removed or contain up to 9 digits.

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00:00.000Z" is valid although
June has only 30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

Hint: The regex also allows a space before the UTC offset (e.g., " +00:00")
to support PostgreSQL's `timestamptz` output format.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoTimestampAction`](../interfaces/IsoTimestampAction.md)\<`TInput$1`, `undefined`\>

An ISO timestamp action.

## Call Signature

> **isoTimestamp**\<`TInput$1`, `TMessage`\>(`message`): [`IsoTimestampAction`](../interfaces/IsoTimestampAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10876

Creates an [ISO timestamp](https://en.wikipedia.org/wiki/ISO_8601) validation
action.

Formats:
- yyyy-mm-ddThh:mm:ss.sssZ
- yyyy-mm-ddThh:mm:ss.sss±hh:mm
- yyyy-mm-ddThh:mm:ss.sss±hhmm
- yyyy-mm-ddThh:mm:ss.sss±hh

Hint: To support timestamps with lower or higher accuracy, the millisecond
specification can be removed or contain up to 9 digits.

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00:00.000Z" is valid although
June has only 30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

Hint: The regex also allows a space before the UTC offset (e.g., " +00:00")
to support PostgreSQL's `timestamptz` output format.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoTimestampIssue`](../interfaces/IsoTimestampIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoTimestampAction`](../interfaces/IsoTimestampAction.md)\<`TInput$1`, `TMessage`\>

An ISO timestamp action.
