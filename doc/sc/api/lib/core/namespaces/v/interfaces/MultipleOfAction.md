[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MultipleOfAction

# Interface: MultipleOfAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:12520

Multiple of action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `Input`

### TRequirement

`TRequirement` *extends* `Input`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`MultipleOfIssue`](MultipleOfIssue.md)

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

> `readonly` **expects**: `` `%${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:12532

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

Defined in: node\_modules/valibot/dist/index.d.mts:12540

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`\>(`requirement`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:12528

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `number`

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### requirement

`TRequirement`

The divisor.

##### Returns

`MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A multiple of action.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `bigint`

###### TRequirement

`TRequirement` *extends* `bigint`

##### Parameters

###### requirement

`TRequirement`

The divisor.

##### Returns

`MultipleOfAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A multiple of action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `number`

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The divisor.

###### message

`TMessage`

The error message.

##### Returns

`MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A multiple of action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a [multiple](https://en.wikipedia.org/wiki/Multiple_(mathematics)) of validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `bigint`

###### TRequirement

`TRequirement` *extends* `bigint`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MultipleOfIssue`](MultipleOfIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The divisor.

###### message

`TMessage`

The error message.

##### Returns

`MultipleOfAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A multiple of action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:12536

The divisor.

***

### type

> `readonly` **type**: `"multiple_of"`

Defined in: node\_modules/valibot/dist/index.d.mts:12524

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
