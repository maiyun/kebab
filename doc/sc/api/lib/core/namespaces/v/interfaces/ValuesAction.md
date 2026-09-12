[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ValuesAction

# Interface: ValuesAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:15848

Values action type.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`ValuesIssue`](ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ValuesIssue`](ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ValuesIssue`](ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ValuesIssue`](ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\>

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

> `readonly` **issue**: [`ValuesIssue`](ValuesIssue.md)

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

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:15860

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

Defined in: node\_modules/valibot/dist/index.d.mts:15868

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `ValuesAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `ValuesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:15856

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `ValuesAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a values validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

###### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

##### Parameters

###### requirement

`TRequirement`

The required values.

##### Returns

`ValuesAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A values action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `ValuesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a values validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`ValueInput`](../type-aliases/ValueInput.md)

###### TRequirement

`TRequirement` *extends* readonly `TInput$1`[]

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ValuesIssue`](ValuesIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The required values.

###### message

`TMessage`

The error message.

##### Returns

`ValuesAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A values action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:15864

The required values.

***

### type

> `readonly` **type**: `"values"`

Defined in: node\_modules/valibot/dist/index.d.mts:15852

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
