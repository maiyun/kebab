[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / StrictObjectSchemaAsync

# Interface: StrictObjectSchemaAsync\<TEntries$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6833

Strict object schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferObjectInput`\<`TEntries$1`\>, `InferObjectOutput`\<`TEntries$1`\>, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](StrictObjectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \}, \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}\>

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

> `readonly` **input**: \{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \}

#### issue

> `readonly` **issue**: [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>

#### output

> `readonly` **output**: \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}

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

### entries

> `readonly` **entries**: `TEntries$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6849

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6845

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

Defined in: node\_modules/valibot/dist/index.d.mts:6853

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TEntries$1`\>(`entries`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>; \}) \| (\{\<`TEntries$1`\>(`entries`): `StrictObjectSchemaAsync`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `StrictObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:6841

The schema reference.

#### Union Members

##### Function

\{\<`TEntries$1`\>(`entries`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`\>(`entries`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>

Creates a strict object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### Returns

[`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `undefined`\>

A strict object schema.

###### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>

Creates a strict object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](StrictObjectIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

###### Returns

[`StrictObjectSchema`](StrictObjectSchema.md)\<`TEntries$1`, `TMessage`\>

A strict object schema.

***

##### Function

\{\<`TEntries$1`\>(`entries`): `StrictObjectSchemaAsync`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `StrictObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`\>(`entries`): `StrictObjectSchemaAsync`\<`TEntries$1`, `undefined`\>

Creates a strict object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### Returns

`StrictObjectSchemaAsync`\<`TEntries$1`, `undefined`\>

A strict object schema.

###### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `StrictObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>

Creates a strict object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](StrictObjectIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

###### Returns

`StrictObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>

A strict object schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"strict_object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6837

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
