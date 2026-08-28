[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseValidation

# Interface: BaseValidation\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3227

Base validation interface.

## Extended by

- [`Base64Action`](Base64Action.md)
- [`BicAction`](BicAction.md)
- [`BytesAction`](BytesAction.md)
- [`CheckAction`](CheckAction.md)
- [`CheckItemsAction`](CheckItemsAction.md)
- [`CreditCardAction`](CreditCardAction.md)
- [`Cuid2Action`](Cuid2Action.md)
- [`DecimalAction`](DecimalAction.md)
- [`DigitsAction`](DigitsAction.md)
- [`DomainAction`](DomainAction.md)
- [`EmailAction`](EmailAction.md)
- [`EmojiAction`](EmojiAction.md)
- [`EmptyAction`](EmptyAction.md)
- [`EndsWithAction`](EndsWithAction.md)
- [`EntriesAction`](EntriesAction.md)
- [`EveryItemAction`](EveryItemAction.md)
- [`ExcludesAction`](ExcludesAction.md)
- [`FiniteAction`](FiniteAction.md)
- [`GraphemesAction`](GraphemesAction.md)
- [`GtValueAction`](GtValueAction.md)
- [`HashAction`](HashAction.md)
- [`HexColorAction`](HexColorAction.md)
- [`HexadecimalAction`](HexadecimalAction.md)
- [`ImeiAction`](ImeiAction.md)
- [`IncludesAction`](IncludesAction.md)
- [`IntegerAction`](IntegerAction.md)
- [`IpAction`](IpAction.md)
- [`Ipv4Action`](Ipv4Action.md)
- [`Ipv6Action`](Ipv6Action.md)
- [`IsbnAction`](IsbnAction.md)
- [`IsoDateAction`](IsoDateAction.md)
- [`IsoDateTimeAction`](IsoDateTimeAction.md)
- [`IsoDateTimeSecondAction`](IsoDateTimeSecondAction.md)
- [`IsoTimeAction`](IsoTimeAction.md)
- [`IsoTimeSecondAction`](IsoTimeSecondAction.md)
- [`IsoTimestampAction`](IsoTimestampAction.md)
- [`IsoWeekAction`](IsoWeekAction.md)
- [`IsrcAction`](IsrcAction.md)
- [`JwsCompactAction`](JwsCompactAction.md)
- [`LengthAction`](LengthAction.md)
- [`LtValueAction`](LtValueAction.md)
- [`Mac48Action`](Mac48Action.md)
- [`Mac64Action`](Mac64Action.md)
- [`MacAction`](MacAction.md)
- [`MaxBytesAction`](MaxBytesAction.md)
- [`MaxEntriesAction`](MaxEntriesAction.md)
- [`MaxGraphemesAction`](MaxGraphemesAction.md)
- [`MaxLengthAction`](MaxLengthAction.md)
- [`MaxSizeAction`](MaxSizeAction.md)
- [`MaxValueAction`](MaxValueAction.md)
- [`MaxWordsAction`](MaxWordsAction.md)
- [`MimeTypeAction`](MimeTypeAction.md)
- [`MinBytesAction`](MinBytesAction.md)
- [`MinEntriesAction`](MinEntriesAction.md)
- [`MinGraphemesAction`](MinGraphemesAction.md)
- [`MinLengthAction`](MinLengthAction.md)
- [`MinSizeAction`](MinSizeAction.md)
- [`MinValueAction`](MinValueAction.md)
- [`MinWordsAction`](MinWordsAction.md)
- [`MultipleOfAction`](MultipleOfAction.md)
- [`NanoIdAction`](NanoIdAction.md)
- [`NonEmptyAction`](NonEmptyAction.md)
- [`NotBytesAction`](NotBytesAction.md)
- [`NotEntriesAction`](NotEntriesAction.md)
- [`NotGraphemesAction`](NotGraphemesAction.md)
- [`NotLengthAction`](NotLengthAction.md)
- [`NotSizeAction`](NotSizeAction.md)
- [`NotValueAction`](NotValueAction.md)
- [`NotValuesAction`](NotValuesAction.md)
- [`NotWordsAction`](NotWordsAction.md)
- [`OctalAction`](OctalAction.md)
- [`PartialCheckAction`](PartialCheckAction.md)
- [`RawCheckAction`](RawCheckAction.md)
- [`RegexAction`](RegexAction.md)
- [`RfcEmailAction`](RfcEmailAction.md)
- [`SafeIntegerAction`](SafeIntegerAction.md)
- [`SizeAction`](SizeAction.md)
- [`SlugAction`](SlugAction.md)
- [`SomeItemAction`](SomeItemAction.md)
- [`StartsWithAction`](StartsWithAction.md)
- [`UlidAction`](UlidAction.md)
- [`UrlAction`](UrlAction.md)
- [`UuidAction`](UuidAction.md)
- [`ValueAction`](ValueAction.md)
- [`ValuesAction`](ValuesAction.md)
- [`WordsAction`](WordsAction.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>

The output dataset.

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3264

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `TIssue`

#### output

> `readonly` **output**: `TOutput$1`

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

Whether it's async.

***

### expects

> `readonly` **expects**: `string` \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:3243

The expected property.

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

The object kind.

***

### reference

> `readonly` **reference**: (...`args`) => `BaseValidation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3239

The validation reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseValidation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3235

The validation type.
