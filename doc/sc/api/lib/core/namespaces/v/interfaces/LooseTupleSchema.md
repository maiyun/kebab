[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / LooseTupleSchema

# Interface: LooseTupleSchema\<TItems$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4939

Loose tuple schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<\[`...InferTupleInput<TItems$1>`, `...unknown[]`\], \[`...InferTupleOutput<TItems$1>`, `...unknown[]`\], [`LooseTupleIssue`](LooseTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

## Type Parameters

### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseTupleIssue`](LooseTupleIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\[`...InferTupleOutput<TItems$1>[]`, `...unknown[]`\], [`LooseTupleIssue`](LooseTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\[`...InferTupleOutput<TItems$1>[]`, `...unknown[]`\], [`LooseTupleIssue`](LooseTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\[`...InferTupleInput<TItems$1>[]`, `...unknown[]`\], \[`...InferTupleOutput<TItems$1>[]`, `...unknown[]`\]\>

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

> `readonly` **input**: \[`...InferTupleInput<TItems$1>[]`, `...unknown[]`\]

#### issue

> `readonly` **issue**: [`LooseTupleIssue`](LooseTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>

#### output

> `readonly` **output**: \[`...InferTupleOutput<TItems$1>[]`, `...unknown[]`\]

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

> `readonly` **expects**: `"Array"`

Defined in: node\_modules/valibot/dist/index.d.mts:4951

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### items

> `readonly` **items**: `TItems$1`

Defined in: node\_modules/valibot/dist/index.d.mts:4955

The items schema.

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

Defined in: node\_modules/valibot/dist/index.d.mts:4959

The error message.

***

### reference

> `readonly` **reference**: \{\<`TItems$1`\>(`items`): `LooseTupleSchema`\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): `LooseTupleSchema`\<`TItems$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4947

The schema reference.

#### Call Signature

> \<`TItems$1`\>(`items`): `LooseTupleSchema`\<`TItems$1`, `undefined`\>

Creates a loose tuple schema.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

##### Parameters

###### items

`TItems$1`

The items schema.

##### Returns

`LooseTupleSchema`\<`TItems$1`, `undefined`\>

A loose tuple schema.

#### Call Signature

> \<`TItems$1`, `TMessage`\>(`items`, `message`): `LooseTupleSchema`\<`TItems$1`, `TMessage`\>

Creates a loose tuple schema.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseTupleIssue`](LooseTupleIssue.md)\> \| `undefined`

##### Parameters

###### items

`TItems$1`

The items schema.

###### message

`TMessage`

The error message.

##### Returns

`LooseTupleSchema`\<`TItems$1`, `TMessage`\>

A loose tuple schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"loose_tuple"`

Defined in: node\_modules/valibot/dist/index.d.mts:4943

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
