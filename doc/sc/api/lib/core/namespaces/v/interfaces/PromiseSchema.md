[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / PromiseSchema

# Interface: PromiseSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6464

Promise schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`Promise`\<`unknown`\>, `Promise`\<`unknown`\>, [`PromiseIssue`](PromiseIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PromiseIssue`](PromiseIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`Promise`\<`unknown`\>, [`PromiseIssue`](PromiseIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`Promise`\<`unknown`\>, [`PromiseIssue`](PromiseIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`Promise`\<`unknown`\>, `Promise`\<`unknown`\>\>

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

> `readonly` **input**: `Promise`

#### issue

> `readonly` **issue**: [`PromiseIssue`](PromiseIssue.md)

#### output

> `readonly` **output**: `Promise`

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

> `readonly` **expects**: `"Promise"`

Defined in: node\_modules/valibot/dist/index.d.mts:6476

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

Defined in: node\_modules/valibot/dist/index.d.mts:6480

The error message.

***

### reference

> `readonly` **reference**: \{(): `PromiseSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `PromiseSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6472

The schema reference.

#### Call Signature

> (): `PromiseSchema`\<`undefined`\>

Creates a promise schema.

##### Returns

`PromiseSchema`\<`undefined`\>

A promise schema.

#### Call Signature

> \<`TMessage`\>(`message`): `PromiseSchema`\<`TMessage`\>

Creates a promise schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PromiseIssue`](PromiseIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`PromiseSchema`\<`TMessage`\>

A promise schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"promise"`

Defined in: node\_modules/valibot/dist/index.d.mts:6468

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
