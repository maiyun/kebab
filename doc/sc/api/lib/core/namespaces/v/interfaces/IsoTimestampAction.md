[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IsoTimestampAction

# Interface: IsoTimestampAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:10802

ISO timestamp action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`IsoTimestampIssue`](IsoTimestampIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoTimestampIssue`](IsoTimestampIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoTimestampIssue`](IsoTimestampIssue.md)\<`TInput$1`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3258

**`Internal`**

Validates known input values.

#### Parameters

##### dataset

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoTimestampIssue`](IsoTimestampIssue.md)\<`TInput$1`\>\>

The output dataset.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~run`](BaseValidation.md#run)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3264

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`IsoTimestampIssue`](IsoTimestampIssue.md)

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~types`](BaseValidation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

Whether it's async.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`async`](BaseValidation.md#async)

***

### expects

> `readonly` **expects**: `null`

Defined in: node\_modules/valibot/dist/index.d.mts:10814

The expected property.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`expects`](BaseValidation.md#expects)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

The object kind.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`kind`](BaseValidation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:10822

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `IsoTimestampAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `IsoTimestampAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:10810

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `IsoTimestampAction`\<`TInput$1`, `undefined`\>

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

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`IsoTimestampAction`\<`TInput$1`, `undefined`\>

An ISO timestamp action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `IsoTimestampAction`\<`TInput$1`, `TMessage`\>

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

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoTimestampIssue`](IsoTimestampIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`IsoTimestampAction`\<`TInput$1`, `TMessage`\>

An ISO timestamp action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:10818

The ISO timestamp regex.

***

### type

> `readonly` **type**: `"iso_timestamp"`

Defined in: node\_modules/valibot/dist/index.d.mts:10806

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
