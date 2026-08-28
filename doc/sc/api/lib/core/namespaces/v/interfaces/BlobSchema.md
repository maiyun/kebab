[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BlobSchema

# Interface: BlobSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:3975

Blob schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`Blob`, `Blob`, [`BlobIssue`](BlobIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BlobIssue`](BlobIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`Blob`, [`BlobIssue`](BlobIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`Blob`, [`BlobIssue`](BlobIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`Blob`, `Blob`\>

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

> `readonly` **input**: `Blob`

#### issue

> `readonly` **issue**: [`BlobIssue`](BlobIssue.md)

#### output

> `readonly` **output**: `Blob`

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

> `readonly` **expects**: `"Blob"`

Defined in: node\_modules/valibot/dist/index.d.mts:3987

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

Defined in: node\_modules/valibot/dist/index.d.mts:3991

The error message.

***

### reference

> `readonly` **reference**: \{(): `BlobSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `BlobSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:3983

The schema reference.

#### Call Signature

> (): `BlobSchema`\<`undefined`\>

Creates a blob schema.

##### Returns

`BlobSchema`\<`undefined`\>

A blob schema.

#### Call Signature

> \<`TMessage`\>(`message`): `BlobSchema`\<`TMessage`\>

Creates a blob schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BlobIssue`](BlobIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`BlobSchema`\<`TMessage`\>

A blob schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"blob"`

Defined in: node\_modules/valibot/dist/index.d.mts:3979

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
