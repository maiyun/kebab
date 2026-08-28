[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / LiteralSchema

# Interface: LiteralSchema\<TLiteral, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4765

Literal schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`TLiteral`, `TLiteral`, [`LiteralIssue`](LiteralIssue.md)\>

## Type Parameters

### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LiteralIssue`](LiteralIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TLiteral`, [`LiteralIssue`](LiteralIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TLiteral`, [`LiteralIssue`](LiteralIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TLiteral`, `TLiteral`\>

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

> `readonly` **input**: `TLiteral`

#### issue

> `readonly` **issue**: [`LiteralIssue`](LiteralIssue.md)

#### output

> `readonly` **output**: `TLiteral`

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

### literal

> `readonly` **literal**: `TLiteral`

Defined in: node\_modules/valibot/dist/index.d.mts:4777

The literal value.

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:4781

The error message.

***

### reference

> `readonly` **reference**: \{\<`TLiteral`\>(`literal_`): `LiteralSchema`\<`TLiteral`, `undefined`\>; \<`TLiteral`, `TMessage`\>(`literal_`, `message`): `LiteralSchema`\<`TLiteral`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4773

The schema reference.

#### Call Signature

> \<`TLiteral`\>(`literal_`): `LiteralSchema`\<`TLiteral`, `undefined`\>

Creates a literal schema.

##### Type Parameters

###### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

##### Parameters

###### literal\_

`TLiteral`

The literal value.

##### Returns

`LiteralSchema`\<`TLiteral`, `undefined`\>

A literal schema.

#### Call Signature

> \<`TLiteral`, `TMessage`\>(`literal_`, `message`): `LiteralSchema`\<`TLiteral`, `TMessage`\>

Creates a literal schema.

##### Type Parameters

###### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LiteralIssue`](LiteralIssue.md)\> \| `undefined`

##### Parameters

###### literal\_

`TLiteral`

The literal value.

###### message

`TMessage`

The error message.

##### Returns

`LiteralSchema`\<`TLiteral`, `TMessage`\>

A literal schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"literal"`

Defined in: node\_modules/valibot/dist/index.d.mts:4769

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
