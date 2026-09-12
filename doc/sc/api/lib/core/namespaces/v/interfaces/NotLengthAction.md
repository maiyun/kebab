[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NotLengthAction

# Interface: NotLengthAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:13336

Not length action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`NotLengthIssue`](NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

### TRequirement

`TRequirement` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotLengthIssue`](NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`NotLengthIssue`](NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`NotLengthIssue`](NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`NotLengthIssue`](NotLengthIssue.md)

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

Defined in: node\_modules/valibot/dist/index.d.mts:13348

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

Defined in: node\_modules/valibot/dist/index.d.mts:13356

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `NotLengthAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `NotLengthAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:13344

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `NotLengthAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a not length validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### requirement

`TRequirement`

The not required length.

##### Returns

`NotLengthAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A not length action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `NotLengthAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a not length validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`LengthInput`](../type-aliases/LengthInput.md)

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NotLengthIssue`](NotLengthIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The not required length.

###### message

`TMessage`

The error message.

##### Returns

`NotLengthAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A not length action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:13352

The not required length.

***

### type

> `readonly` **type**: `"not_length"`

Defined in: node\_modules/valibot/dist/index.d.mts:13340

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
