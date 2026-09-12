[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / minWords

# Function: minWords()

## Call Signature

> **minWords**\<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): [`MinWordsAction`](../interfaces/MinWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12748

Creates a min words validation action.

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

The minimum words.

### Returns

[`MinWordsAction`](../interfaces/MinWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

A min words action.

## Call Signature

> **minWords**\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): [`MinWordsAction`](../interfaces/MinWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:12758

Creates a min words validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TLocales

`TLocales` *extends* `LocalesArgument`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinWordsIssue`](../interfaces/MinWordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### locales

`TLocales`

The locales to be used.

#### requirement

`TRequirement`

The minimum words.

#### message

`TMessage`

The error message.

### Returns

[`MinWordsAction`](../interfaces/MinWordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

A min words action.
