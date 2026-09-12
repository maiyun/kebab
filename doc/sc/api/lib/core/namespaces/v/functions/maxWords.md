[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / maxWords

# Function: maxWords()

## Call Signature

> **maxWords**\<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): [`MaxWordsAction`](../interfaces/MaxWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12086

Creates a max words validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TLocales

`TLocales` *extends* `LocalesArgument`

#### TRequirement

`TRequirement` *extends* `number`

### Parameters

#### locales

`TLocales`

The locales to be used.

#### requirement

`TRequirement`

The maximum words.

### Returns

[`MaxWordsAction`](../interfaces/MaxWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

A max words action.

## Call Signature

> **maxWords**\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): [`MaxWordsAction`](../interfaces/MaxWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12096

Creates a max words validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TLocales

`TLocales` *extends* `LocalesArgument`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MaxWordsIssue`](../interfaces/MaxWordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### locales

`TLocales`

The locales to be used.

#### requirement

`TRequirement`

The maximum words.

#### message

`TMessage`

The error message.

### Returns

[`MaxWordsAction`](../interfaces/MaxWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

A max words action.
