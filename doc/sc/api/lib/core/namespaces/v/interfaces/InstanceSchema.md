[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / InstanceSchema

# Interface: InstanceSchema\<TClass, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4523

Instance schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InstanceType`\<`TClass`\>, `InstanceType`\<`TClass`\>, [`InstanceIssue`](InstanceIssue.md)\>

## Type Parameters

### TClass

`TClass` *extends* [`Class`](../type-aliases/Class.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`InstanceIssue`](InstanceIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InstanceType`\<`TClass`\>, [`InstanceIssue`](InstanceIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InstanceType`\<`TClass`\>, [`InstanceIssue`](InstanceIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InstanceType`\<`TClass`\>, `InstanceType`\<`TClass`\>\>

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

> `readonly` **input**: `InstanceType`

#### issue

> `readonly` **issue**: [`InstanceIssue`](InstanceIssue.md)

#### output

> `readonly` **output**: `InstanceType`

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

### class

> `readonly` **class**: `TClass`

Defined in: node\_modules/valibot/dist/index.d.mts:4535

The class of the instance.

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

Defined in: node\_modules/valibot/dist/index.d.mts:4539

The error message.

***

### reference

> `readonly` **reference**: \{\<`TClass`\>(`class_`): `InstanceSchema`\<`TClass`, `undefined`\>; \<`TClass`, `TMessage`\>(`class_`, `message`): `InstanceSchema`\<`TClass`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4531

The schema reference.

#### Call Signature

> \<`TClass`\>(`class_`): `InstanceSchema`\<`TClass`, `undefined`\>

Creates an instance schema.

##### Type Parameters

###### TClass

`TClass` *extends* [`Class`](../type-aliases/Class.md)

##### Parameters

###### class\_

`TClass`

The class of the instance.

##### Returns

`InstanceSchema`\<`TClass`, `undefined`\>

An instance schema.

#### Call Signature

> \<`TClass`, `TMessage`\>(`class_`, `message`): `InstanceSchema`\<`TClass`, `TMessage`\>

Creates an instance schema.

##### Type Parameters

###### TClass

`TClass` *extends* [`Class`](../type-aliases/Class.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`InstanceIssue`](InstanceIssue.md)\> \| `undefined`

##### Parameters

###### class\_

`TClass`

The class of the instance.

###### message

`TMessage`

The error message.

##### Returns

`InstanceSchema`\<`TClass`, `TMessage`\>

An instance schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"instance"`

Defined in: node\_modules/valibot/dist/index.d.mts:4527

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
