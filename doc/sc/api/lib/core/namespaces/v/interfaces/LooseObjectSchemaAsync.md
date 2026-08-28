[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / LooseObjectSchemaAsync

# Interface: LooseObjectSchemaAsync\<TEntries$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4872

Object schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferObjectInput`\<`TEntries$1`\> & `object`, `InferObjectOutput`\<`TEntries$1`\> & `object`, [`LooseObjectIssue`](LooseObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseObjectIssue`](LooseObjectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`LooseObjectIssue`](LooseObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`LooseObjectIssue`](LooseObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \} & `object`, \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`\>

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

> `readonly` **input**: \{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \} & `object`

#### issue

> `readonly` **issue**: [`LooseObjectIssue`](LooseObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>

#### output

> `readonly` **output**: \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`

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

Defined in: node\_modules/valibot/dist/index.d.mts:4892

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:4888

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

Defined in: node\_modules/valibot/dist/index.d.mts:4896

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TEntries$1`\>(`entries`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>; \}) \| (\{\<`TEntries$1`\>(`entries`): `LooseObjectSchemaAsync`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `LooseObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:4884

The schema reference.

#### Union Members

##### Function

\{\<`TEntries$1`\>(`entries`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`\>(`entries`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>

Creates a loose object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### Returns

[`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `undefined`\>

A loose object schema.

###### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>

Creates a loose object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseObjectIssue`](LooseObjectIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

###### Returns

[`LooseObjectSchema`](LooseObjectSchema.md)\<`TEntries$1`, `TMessage`\>

A loose object schema.

***

##### Function

\{\<`TEntries$1`\>(`entries`): `LooseObjectSchemaAsync`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `LooseObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`\>(`entries`): `LooseObjectSchemaAsync`\<`TEntries$1`, `undefined`\>

Creates a loose object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### Returns

`LooseObjectSchemaAsync`\<`TEntries$1`, `undefined`\>

A loose object schema.

###### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `LooseObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>

Creates a loose object schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseObjectIssue`](LooseObjectIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

###### Returns

`LooseObjectSchemaAsync`\<`TEntries$1`, `TMessage`\>

A loose object schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"loose_object"`

Defined in: node\_modules/valibot/dist/index.d.mts:4880

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
