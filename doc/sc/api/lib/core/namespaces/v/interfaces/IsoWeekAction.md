[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IsoWeekAction

# Interface: IsoWeekAction\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:10976

ISO week action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`IsoWeekIssue`](IsoWeekIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoWeekIssue`](IsoWeekIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoWeekIssue`](IsoWeekIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`IsoWeekIssue`](IsoWeekIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`IsoWeekIssue`](IsoWeekIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:10988

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

Defined in: node\_modules/valibot/dist/index.d.mts:10996

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `IsoWeekAction`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`message`): `IsoWeekAction`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:10984

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `IsoWeekAction`\<`TInput$1`, `undefined`\>

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-Www

Hint: The regex used cannot validate the maximum number of weeks based on
the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`IsoWeekAction`\<`TInput$1`, `undefined`\>

An ISO week action.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`message`): `IsoWeekAction`\<`TInput$1`, `TMessage`\>

Creates an [ISO week](https://en.wikipedia.org/wiki/ISO_8601) validation action.

Format: yyyy-Www

Hint: The regex used cannot validate the maximum number of weeks based on
the year. For example, "2021W53" is valid although 2021 has only 52 weeks.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IsoWeekIssue`](IsoWeekIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`IsoWeekAction`\<`TInput$1`, `TMessage`\>

An ISO week action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `RegExp`

Defined in: node\_modules/valibot/dist/index.d.mts:10992

The ISO week regex.

***

### type

> `readonly` **type**: `"iso_week"`

Defined in: node\_modules/valibot/dist/index.d.mts:10980

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
