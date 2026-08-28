[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BigintSchema

# Interface: BigintSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:3921

Bigint schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`bigint`, `bigint`, [`BigintIssue`](BigintIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BigintIssue`](BigintIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`bigint`, [`BigintIssue`](BigintIssue.md)\>

Defined in: node\_modules/valibot/dist/index.d.mts:3102

**`Internal`**

Parses unknown input values.

#### Parameters

##### dataset

[`UnknownDataset`](UnknownDataset.md)

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`bigint`, [`BigintIssue`](BigintIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`bigint`, `bigint`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3091

**`Internal`**

The Standard Schema properties.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~standard`](BaseSchema.md#standard)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3108

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `bigint`

#### issue

> `readonly` **issue**: [`BigintIssue`](BigintIssue.md)

#### output

> `readonly` **output**: `bigint`

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~types`](BaseSchema.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3085

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `"bigint"`

Defined in: node\_modules/valibot/dist/index.d.mts:3933

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### kind

> `readonly` **kind**: `"schema"`

Defined in: node\_modules/valibot/dist/index.d.mts:3069

The object kind.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`kind`](BaseSchema.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:3937

The error message.

***

### reference

> `readonly` **reference**: \{(): `BigintSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `BigintSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:3929

The schema reference.

#### Call Signature

> (): `BigintSchema`\<`undefined`\>

Creates a bigint schema.

##### Returns

`BigintSchema`\<`undefined`\>

A bigint schema.

#### Call Signature

> \<`TMessage`\>(`message`): `BigintSchema`\<`TMessage`\>

Creates a bigint schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BigintIssue`](BigintIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`BigintSchema`\<`TMessage`\>

A bigint schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"bigint"`

Defined in: node\_modules/valibot/dist/index.d.mts:3925

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
