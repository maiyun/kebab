[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NeverSchema

# Interface: NeverSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5225

Never schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`never`, `never`, [`NeverIssue`](NeverIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NeverIssue`](NeverIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`never`, [`NeverIssue`](NeverIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`never`, [`NeverIssue`](NeverIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`never`, `never`\>

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

> `readonly` **input**: `never`

#### issue

> `readonly` **issue**: [`NeverIssue`](NeverIssue.md)

#### output

> `readonly` **output**: `never`

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

> `readonly` **expects**: `"never"`

Defined in: node\_modules/valibot/dist/index.d.mts:5237

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

Defined in: node\_modules/valibot/dist/index.d.mts:5241

The error message.

***

### reference

> `readonly` **reference**: \{(): `NeverSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `NeverSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5233

The schema reference.

#### Call Signature

> (): `NeverSchema`\<`undefined`\>

Creates a never schema.

##### Returns

`NeverSchema`\<`undefined`\>

A never schema.

#### Call Signature

> \<`TMessage`\>(`message`): `NeverSchema`\<`TMessage`\>

Creates a never schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NeverIssue`](NeverIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`NeverSchema`\<`TMessage`\>

A never schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"never"`

Defined in: node\_modules/valibot/dist/index.d.mts:5229

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
