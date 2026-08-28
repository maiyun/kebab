[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IsoDateTimeAction

# Interface: IsoDateTimeAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:10494

ISO date time action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`IsoDateTimeIssue`](IsoDateTimeIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoDateTimeIssue`](IsoDateTimeIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoDateTimeIssue`](IsoDateTimeIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoDateTimeIssue`](IsoDateTimeIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`IsoDateTimeIssue`](IsoDateTimeIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:10506

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

Defined in: node\_modules/valibot/dist/index.d.mts:10514

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `IsoDateTimeAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `IsoDateTimeAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:10502

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `IsoDateTimeAction`\<`TInput$1`, `undefined`\>

Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-ddThh:mm

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00" is valid although June has only
30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`IsoDateTimeAction`\<`TInput$1`, `undefined`\>

An ISO date time action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `IsoDateTimeAction`\<`TInput$1`, `TMessage`\>

Creates an [ISO date time](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-mm-ddThh:mm

Hint: The regex used cannot validate the maximum number of days based on
year and month. For example, "2023-06-31T00:00" is valid although June has only
30 days.

Hint: The regex also allows a space as a separator between the date and time
parts instead of the "T" character.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoDateTimeIssue`](IsoDateTimeIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`IsoDateTimeAction`\<`TInput$1`, `TMessage`\>

An ISO date time action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:10510

The ISO date time regex.

***

### type

> `readonly` **type**: `"iso_date_time"`

Defined in: node\_modules/valibot/dist/index.d.mts:10498

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
