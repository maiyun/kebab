[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / StrictTupleSchemaAsync

# Interface: StrictTupleSchemaAsync\<TItems$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6940

Strict tuple schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferTupleInput`\<`TItems$1`\>, `InferTupleOutput`\<`TItems$1`\>, [`StrictTupleIssue`](StrictTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>

## Type Parameters

### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictTupleIssue`](StrictTupleIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferTupleOutput`\<`TItems$1`\>, [`StrictTupleIssue`](StrictTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3136

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferTupleOutput`\<`TItems$1`\>, [`StrictTupleIssue`](StrictTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferTupleInput`\<`TItems$1`\>, `InferTupleOutput`\<`TItems$1`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3091

**`Internal`**

The Standard Schema properties.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~standard`](BaseSchemaAsync.md#standard)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3108

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`StrictTupleIssue`](StrictTupleIssue.md) \| `InferTupleIssue`\<`TItems$1`\>

#### output

> `readonly` **output**: `TOutput$1`

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~types`](BaseSchemaAsync.md#types)

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3125

Whether it's async.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`async`](BaseSchemaAsync.md#async)

***

### expects

> `readonly` **expects**: `"Array"`

Defined in: node\_modules/valibot/dist/index.d.mts:6952

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### items

> `readonly` **items**: `TItems$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6956

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

Defined in: node\_modules/valibot/dist/index.d.mts:6960

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TItems$1`\>(`items`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>; \}) \| (\{\<`TItems$1`\>(`items`): `StrictTupleSchemaAsync`\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): `StrictTupleSchemaAsync`\<`TItems$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:6948

The schema reference.

#### Union Members

##### Function

\{\<`TItems$1`\>(`items`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>; \}

###### Call Signature

> \<`TItems$1`\>(`items`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `undefined`\>

Creates a strict tuple schema.

###### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### Parameters

###### items

`TItems$1`

The items schema.

###### Returns

[`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `undefined`\>

A strict tuple schema.

###### Call Signature

> \<`TItems$1`, `TMessage`\>(`items`, `message`): [`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>

Creates a strict tuple schema.

###### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictTupleIssue`](StrictTupleIssue.md)\> \| `undefined`

###### Parameters

###### items

`TItems$1`

The items schema.

###### message

`TMessage`

The error message.

###### Returns

[`StrictTupleSchema`](StrictTupleSchema.md)\<`TItems$1`, `TMessage`\>

A strict tuple schema.

***

##### Function

\{\<`TItems$1`\>(`items`): `StrictTupleSchemaAsync`\<`TItems$1`, `undefined`\>; \<`TItems$1`, `TMessage`\>(`items`, `message`): `StrictTupleSchemaAsync`\<`TItems$1`, `TMessage`\>; \}

###### Call Signature

> \<`TItems$1`\>(`items`): `StrictTupleSchemaAsync`\<`TItems$1`, `undefined`\>

Creates a strict tuple schema.

###### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

###### Parameters

###### items

`TItems$1`

The items schema.

###### Returns

`StrictTupleSchemaAsync`\<`TItems$1`, `undefined`\>

A strict tuple schema.

###### Call Signature

> \<`TItems$1`, `TMessage`\>(`items`, `message`): `StrictTupleSchemaAsync`\<`TItems$1`, `TMessage`\>

Creates a strict tuple schema.

###### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItemsAsync`](../type-aliases/TupleItemsAsync.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictTupleIssue`](StrictTupleIssue.md)\> \| `undefined`

###### Parameters

###### items

`TItems$1`

The items schema.

###### message

`TMessage`

The error message.

###### Returns

`StrictTupleSchemaAsync`\<`TItems$1`, `TMessage`\>

A strict tuple schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"strict_tuple"`

Defined in: node\_modules/valibot/dist/index.d.mts:6944

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
