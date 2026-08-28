[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / StrictObjectSchema

# Interface: StrictObjectSchema\<TEntries$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6789

Strict object schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferObjectInput`\<`TEntries$1`\>, `InferObjectOutput`\<`TEntries$1`\>, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](StrictObjectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \}, \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}\>

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

> `readonly` **input**: \{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \}

#### issue

> `readonly` **issue**: [`StrictObjectIssue`](StrictObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>

#### output

> `readonly` **output**: \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}

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

### entries

> `readonly` **entries**: `TEntries$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6805

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6801

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

Defined in: node\_modules/valibot/dist/index.d.mts:6809

The error message.

***

### reference

> `readonly` **reference**: \{\<`TEntries$1`\>(`entries`): `StrictObjectSchema`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `StrictObjectSchema`\<`TEntries$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6797

The schema reference.

#### Call Signature

> \<`TEntries$1`\>(`entries`): `StrictObjectSchema`\<`TEntries$1`, `undefined`\>

Creates a strict object schema.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

##### Parameters

###### entries

`TEntries$1`

The entries schema.

##### Returns

`StrictObjectSchema`\<`TEntries$1`, `undefined`\>

A strict object schema.

#### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `StrictObjectSchema`\<`TEntries$1`, `TMessage`\>

Creates a strict object schema.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](StrictObjectIssue.md)\> \| `undefined`

##### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

##### Returns

`StrictObjectSchema`\<`TEntries$1`, `TMessage`\>

A strict object schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"strict_object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6793

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
