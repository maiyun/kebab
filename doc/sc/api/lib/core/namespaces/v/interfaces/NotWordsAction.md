[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NotWordsAction

# Interface: NotWordsAction\<TInput$1, TLocales, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:13262

Not words action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`NotWordsIssue`](NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TLocales

`TLocales` *extends* `Intl.LocalesArgument`

### TRequirement

`TRequirement` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotWordsIssue`](NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`NotWordsIssue`](NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`NotWordsIssue`](NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`NotWordsIssue`](NotWordsIssue.md)

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

> `readonly` **expects**: `` `!${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:13274

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

### locales

> `readonly` **locales**: `TLocales`

Defined in: node\_modules/valibot/dist/index.d.mts:13278

The locales to be used.

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:13286

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): `NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): `NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:13270

The action reference.

#### Call Signature

> \<`TInput$1`, `TLocales`, `TRequirement`\>(`locales`, `requirement`): `NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

Creates a not words validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TLocales

`TLocales` *extends* `LocalesArgument`

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### locales

`TLocales`

The locales to be used.

###### requirement

`TRequirement`

The not required words.

##### Returns

`NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `undefined`\>

A not words action.

#### Call Signature

> \<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>(`locales`, `requirement`, `message`): `NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

Creates a not words validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TLocales

`TLocales` *extends* `LocalesArgument`

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotWordsIssue`](NotWordsIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### locales

`TLocales`

The locales to be used.

###### requirement

`TRequirement`

The not required words.

###### message

`TMessage`

The error message.

##### Returns

`NotWordsAction`\<`TInput$1`, `TLocales`, `TRequirement`, `TMessage`\>

A not words action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:13282

The not required words.

***

### type

> `readonly` **type**: `"not_words"`

Defined in: node\_modules/valibot/dist/index.d.mts:13266

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
