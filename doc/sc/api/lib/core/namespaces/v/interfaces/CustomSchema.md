[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / CustomSchema

# Interface: CustomSchema\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4089

Custom schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`TInput$1`, `TInput$1`, [`CustomIssue`](CustomIssue.md)\>

## Type Parameters

### TInput$1

`TInput$1`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`CustomIssue`](CustomIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`CustomIssue`](CustomIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TInput$1`, `TInput$1`\>

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

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`CustomIssue`](CustomIssue.md)

#### output

> `readonly` **output**: `TInput$1`

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

### check

> `readonly` **check**: `Check`

Defined in: node\_modules/valibot/dist/index.d.mts:4105

The type check function.

***

### expects

> `readonly` **expects**: `"unknown"`

Defined in: node\_modules/valibot/dist/index.d.mts:4101

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

Defined in: node\_modules/valibot/dist/index.d.mts:4109

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(`check`): `CustomSchema`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`check`, `message`): `CustomSchema`\<`TInput$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4097

The schema reference.

#### Call Signature

> \<`TInput$1`\>(`check`): `CustomSchema`\<`TInput$1`, `undefined`\>

Creates a custom schema.

##### Type Parameters

###### TInput$1

`TInput$1`

##### Parameters

###### check

`Check`

The type check function.

##### Returns

`CustomSchema`\<`TInput$1`, `undefined`\>

A custom schema.

#### Call Signature

> \<`TInput$1`, `TMessage`\>(`check`, `message`): `CustomSchema`\<`TInput$1`, `TMessage`\>

Creates a custom schema.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined` = [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined`

##### Parameters

###### check

`Check`

The type check function.

###### message

`TMessage`

The error message.

##### Returns

`CustomSchema`\<`TInput$1`, `TMessage`\>

A custom schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"custom"`

Defined in: node\_modules/valibot/dist/index.d.mts:4093

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
