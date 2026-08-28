[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / TupleSchema

# Interface: TupleSchema\<TItems$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:7111

Tuple schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferTupleInput`\<`TItems$1`\>, `InferTupleOutput`\<`TItems$1`\>, [`TupleIssue`](TupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

## Type Parameters

### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleIssue`](TupleIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferTupleOutput`\<`TItems$1`\>, [`TupleIssue`](TupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferTupleOutput`\<`TItems$1`\>, [`TupleIssue`](TupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferTupleInput`\<`TItems$1`\>, `InferTupleOutput`\<`TItems$1`\>\>

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

> `readonly` **issue**: [`TupleIssue`](TupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>

#### output

> `readonly` **output**: `TOutput$1`

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

Defined in: node\_modules/valibot/dist/index.d.mts:7123

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### items

> `readonly` **items**: `TItems$1`

Defined in: node\_modules/valibot/dist/index.d.mts:7127

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

Defined in: node\_modules/valibot/dist/index.d.mts:7131

The error message.

***

### reference

> `readonly` **reference**: \{\<`TItems$1`\>(`items`): `TupleSchema`\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): `TupleSchema`\<`TItems$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:7119

The schema reference.

#### Call Signature

> \<`TItems$1`\>(`items`): `TupleSchema`\<`TItems$1`, `undefined`\>

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTuple`. To
return an issue for unknown items, use `strictTuple`. To include and
validate unknown items, use `tupleWithRest`.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

##### Parameters

###### items

`TItems$1`

The items schema.

##### Returns

`TupleSchema`\<`TItems$1`, `undefined`\>

A tuple schema.

#### Call Signature

> \<`TItems$1`, `TMessage`\>(`items`, `message`): `TupleSchema`\<`TItems$1`, `TMessage`\>

Creates a tuple schema.

Hint: This schema removes unknown items. The output will only include the
items you specify. To include unknown items, use `looseTuple`. To
return an issue for unknown items, use `strictTuple`. To include and
validate unknown items, use `tupleWithRest`.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleIssue`](TupleIssue.md)\> \| `undefined`

##### Parameters

###### items

`TItems$1`

The items schema.

###### message

`TMessage`

The error message.

##### Returns

`TupleSchema`\<`TItems$1`, `TMessage`\>

A tuple schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"tuple"`

Defined in: node\_modules/valibot/dist/index.d.mts:7115

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
