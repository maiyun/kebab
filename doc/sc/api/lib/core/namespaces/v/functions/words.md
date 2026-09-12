[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / words

# Function: words()

## Call Signature

> **words**\<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): [`WordsAction`](../interfaces/WordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15951

Creates a words validation action.

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

The required words.

### Returns

[`WordsAction`](../interfaces/WordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

A words action.

## Call Signature

> **words**\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): [`WordsAction`](../interfaces/WordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:15961

Creates a words validation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TLocales

`TLocales` *extends* `LocalesArgument`

#### TRequirement

`TRequirement` *extends* `number`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`WordsIssue`](../interfaces/WordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

### Parameters

#### locales

`TLocales`

The locales to be used.

#### requirement

`TRequirement`

The required words.

#### message

`TMessage`

The error message.

### Returns

[`WordsAction`](../interfaces/WordsAction.md)\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

A words action.
