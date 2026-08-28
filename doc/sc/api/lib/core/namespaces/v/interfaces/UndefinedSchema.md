[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / UndefinedSchema

# Interface: UndefinedSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:7355

Undefined schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`undefined`, `undefined`, [`UndefinedIssue`](UndefinedIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UndefinedIssue`](UndefinedIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`undefined`, [`UndefinedIssue`](UndefinedIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`undefined`, [`UndefinedIssue`](UndefinedIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`undefined`, `undefined`\>

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

> `readonly` **input**: `undefined`

#### issue

> `readonly` **issue**: [`UndefinedIssue`](UndefinedIssue.md)

#### output

> `readonly` **output**: `undefined`

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

> `readonly` **expects**: `"undefined"`

Defined in: node\_modules/valibot/dist/index.d.mts:7367

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

Defined in: node\_modules/valibot/dist/index.d.mts:7371

The error message.

***

### reference

> `readonly` **reference**: \{(): `UndefinedSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `UndefinedSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:7363

The schema reference.

#### Call Signature

> (): `UndefinedSchema`\<`undefined`\>

Creates an undefined schema.

##### Returns

`UndefinedSchema`\<`undefined`\>

An undefined schema.

#### Call Signature

> \<`TMessage`\>(`message`): `UndefinedSchema`\<`TMessage`\>

Creates an undefined schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UndefinedIssue`](UndefinedIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`UndefinedSchema`\<`TMessage`\>

An undefined schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"undefined"`

Defined in: node\_modules/valibot/dist/index.d.mts:7359

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
