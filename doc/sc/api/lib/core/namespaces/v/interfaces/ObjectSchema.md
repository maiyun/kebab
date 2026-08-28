[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ObjectSchema

# Interface: ObjectSchema\<TEntries$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6057

Object schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferObjectInput`\<`TEntries$1`\>, `InferObjectOutput`\<`TEntries$1`\>, [`ObjectIssue`](ObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](ObjectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`ObjectIssue`](ObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \}, [`ObjectIssue`](ObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>\>

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

> `readonly` **issue**: [`ObjectIssue`](ObjectIssue.md) \| `InferObjectIssue`\<`TEntries$1`\>

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

Defined in: node\_modules/valibot/dist/index.d.mts:6073

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6069

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

Defined in: node\_modules/valibot/dist/index.d.mts:6077

The error message.

***

### reference

> `readonly` **reference**: \{\<`TEntries$1`\>(`entries`): `ObjectSchema`\<`TEntries$1`, `undefined`\>; \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `ObjectSchema`\<`TEntries$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6065

The schema reference.

#### Call Signature

> \<`TEntries$1`\>(`entries`): `ObjectSchema`\<`TEntries$1`, `undefined`\>

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

##### Parameters

###### entries

`TEntries$1`

The entries schema.

##### Returns

`ObjectSchema`\<`TEntries$1`, `undefined`\>

An object schema.

#### Call Signature

> \<`TEntries$1`, `TMessage`\>(`entries`, `message`): `ObjectSchema`\<`TEntries$1`, `TMessage`\>

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](ObjectIssue.md)\> \| `undefined`

##### Parameters

###### entries

`TEntries$1`

The entries schema.

###### message

`TMessage`

The error message.

##### Returns

`ObjectSchema`\<`TEntries$1`, `TMessage`\>

An object schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6061

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
