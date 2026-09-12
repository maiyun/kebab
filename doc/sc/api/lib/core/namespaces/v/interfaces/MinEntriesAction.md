[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MinEntriesAction

# Interface: MinEntriesAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:12369

**`Beta`**

Min entries action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`MinEntriesIssue`](MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

### TRequirement

`TRequirement` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinEntriesIssue`](MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MinEntriesIssue`](MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MinEntriesIssue`](MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`MinEntriesIssue`](MinEntriesIssue.md)

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~types`](BaseValidation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

**`Beta`**

Whether it's async.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`async`](BaseValidation.md#async)

***

### expects

> `readonly` **expects**: `` `>=${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:12381

**`Beta`**

The expected property.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`expects`](BaseValidation.md#expects)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

**`Beta`**

The object kind.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`kind`](BaseValidation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:12389

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `MinEntriesAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MinEntriesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:12377

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `MinEntriesAction`\<`TInput$1`, `TRequirement`, `undefined`\>

**`Beta`**

Creates a min entries validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### requirement

`TRequirement`

The minimum entries.

##### Returns

`MinEntriesAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A min entries action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MinEntriesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

**`Beta`**

Creates a min entries validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinEntriesIssue`](MinEntriesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The minimum entries.

###### message

`TMessage`

The error message.

##### Returns

`MinEntriesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A min entries action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:12385

**`Beta`**

The minimum entries.

***

### type

> `readonly` **type**: `"min_entries"`

Defined in: node\_modules/valibot/dist/index.d.mts:12373

**`Beta`**

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
