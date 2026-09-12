[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / isoDateTimeSecond

# Function: isoDateTimeSecond()

## Call Signature

> **isoDateTimeSecond**\<`TInput$1`\>(): [`IsoDateTimeSecondAction`](../interfaces/IsoDateTimeSecondAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10683

Creates an [ISO date time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-ddThh:mm:ss

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00:00" is valid although June has only
30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`IsoDateTimeSecondAction`](../interfaces/IsoDateTimeSecondAction.md)\<`TInput$1`, `undefined`\>

An ISO date time second action.

## Call Signature

> **isoDateTimeSecond**\<`TInput$1`, `TMessage`\>(`message`): [`IsoDateTimeSecondAction`](../interfaces/IsoDateTimeSecondAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:10700

Creates an [ISO date time second](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-ddThh:mm:ss

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00:00" is valid although June has only
30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoDateTimeSecondIssue`](../interfaces/IsoDateTimeSecondIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`IsoDateTimeSecondAction`](../interfaces/IsoDateTimeSecondAction.md)\<`TInput$1`, `TMessage`\>

An ISO date time second action.
