[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BooleanSchema

# Interface: BooleanSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4029

Boolean schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`boolean`, `boolean`, [`BooleanIssue`](BooleanIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BooleanIssue`](BooleanIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`boolean`, [`BooleanIssue`](BooleanIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`boolean`, [`BooleanIssue`](BooleanIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`boolean`, `boolean`\>

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

> `readonly` **input**: `boolean`

#### issue

> `readonly` **issue**: [`BooleanIssue`](BooleanIssue.md)

#### output

> `readonly` **output**: `boolean`

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

> `readonly` **expects**: `"boolean"`

Defined in: node\_modules/valibot/dist/index.d.mts:4041

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

Defined in: node\_modules/valibot/dist/index.d.mts:4045

The error message.

***

### reference

> `readonly` **reference**: \{(): `BooleanSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `BooleanSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4037

The schema reference.

#### Call Signature

> (): `BooleanSchema`\<`undefined`\>

Creates a boolean schema.

##### Returns

`BooleanSchema`\<`undefined`\>

A boolean schema.

#### Call Signature

> \<`TMessage`\>(`message`): `BooleanSchema`\<`TMessage`\>

Creates a boolean schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BooleanIssue`](BooleanIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`BooleanSchema`\<`TMessage`\>

A boolean schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"boolean"`

Defined in: node\_modules/valibot/dist/index.d.mts:4033

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
