[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SizeAction

# Interface: SizeAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:14611

Size action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`SizeIssue`](SizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

### TRequirement

`TRequirement` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SizeIssue`](SizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`SizeIssue`](SizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`SizeIssue`](SizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`SizeIssue`](SizeIssue.md)

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

> `readonly` **expects**: `` `${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:14623

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

Defined in: node\_modules/valibot/dist/index.d.mts:14631

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `SizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `SizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:14619

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `SizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a size validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### requirement

`TRequirement`

The required size.

##### Returns

`SizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A size action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `SizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a size validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SizeIssue`](SizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The required size.

###### message

`TMessage`

The error message.

##### Returns

`SizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A size action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:14627

The required size.

***

### type

> `readonly` **type**: `"size"`

Defined in: node\_modules/valibot/dist/index.d.mts:14615

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
