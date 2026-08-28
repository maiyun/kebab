[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / EnumSchema

# Interface: EnumSchema\<TEnum, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4262

Enum schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>, [`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>, [`EnumIssue`](EnumIssue.md)\>

## Type Parameters

### TEnum

`TEnum` *extends* [`Enum`](Enum.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EnumIssue`](EnumIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<[`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>, [`EnumIssue`](EnumIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>, [`EnumIssue`](EnumIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>, [`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>\>

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

> `readonly` **input**: [`EnumValues`](../type-aliases/EnumValues.md)

#### issue

> `readonly` **issue**: [`EnumIssue`](EnumIssue.md)

#### output

> `readonly` **output**: [`EnumValues`](../type-aliases/EnumValues.md)

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

### enum

> `readonly` **enum**: `TEnum`

Defined in: node\_modules/valibot/dist/index.d.mts:4274

The enum object.

***

### expects

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3081

The expected property.

#### Inherited from

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

Defined in: node\_modules/valibot/dist/index.d.mts:4282

The error message.

***

### options

> `readonly` **options**: [`EnumValues`](../type-aliases/EnumValues.md)\<`TEnum`\>[]

Defined in: node\_modules/valibot/dist/index.d.mts:4278

The enum options.

***

### reference

> `readonly` **reference**: \{\<`TEnum`\>(`enum__`): `EnumSchema`\<`TEnum`, `undefined`\>; \<`TEnum`, `TMessage`\>(`enum__`, `message`): `EnumSchema`\<`TEnum`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4270

The schema reference.

#### Call Signature

> \<`TEnum`\>(`enum__`): `EnumSchema`\<`TEnum`, `undefined`\>

Creates an enum schema.

##### Type Parameters

###### TEnum

`TEnum` *extends* [`Enum`](Enum.md)

##### Parameters

###### enum\_\_

`TEnum`

The enum object.

##### Returns

`EnumSchema`\<`TEnum`, `undefined`\>

An enum schema.

#### Call Signature

> \<`TEnum`, `TMessage`\>(`enum__`, `message`): `EnumSchema`\<`TEnum`, `TMessage`\>

Creates an enum schema.

##### Type Parameters

###### TEnum

`TEnum` *extends* [`Enum`](Enum.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EnumIssue`](EnumIssue.md)\> \| `undefined`

##### Parameters

###### enum\_\_

`TEnum`

The enum object.

###### message

`TMessage`

The error message.

##### Returns

`EnumSchema`\<`TEnum`, `TMessage`\>

An enum schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"enum"`

Defined in: node\_modules/valibot/dist/index.d.mts:4266

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
