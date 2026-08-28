[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / notWords

# Function: notWords()

## Call Signature

> **notWords**\<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): [`NotWordsAction`](../interfaces/NotWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13296

Creates a not words validation action.

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

The not required words.

### Returns

[`NotWordsAction`](../interfaces/NotWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

A not words action.

## Call Signature

> **notWords**\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): [`NotWordsAction`](../interfaces/NotWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13306

Creates a not words validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TLocales

`TLocales` *extends* `LocalesArgument`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotWordsIssue`](../interfaces/NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### locales

`TLocales`

The locales to be used.

#### requirement

`TRequirement`

The not required words.

#### message

`TMessage`

The error message.

### Returns

[`NotWordsAction`](../interfaces/NotWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

A not words action.
