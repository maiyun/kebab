[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ObjectWithRestSchema

# Interface: ObjectWithRestSchema\<TEntries$1, TRest$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6184

Object with rest schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferObjectInput`\<`TEntries$1`\> & `object`, `InferObjectOutput`\<`TEntries$1`\> & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](ObjectWithRestIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \} & `object`, \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`\>

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

> `readonly` **input**: \{ \[TKey in string \| number \| symbol\]: InputWithQuestionMarks\<TEntries$1, InferEntriesInput\<TEntries$1\>\>\[TKey\] \} & `object`

#### issue

> `readonly` **issue**: [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>

#### output

> `readonly` **output**: \{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`

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

Defined in: node\_modules/valibot/dist/index.d.mts:6204

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6200

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

Defined in: node\_modules/valibot/dist/index.d.mts:6212

The error message.

***

### reference

> `readonly` **reference**: \{\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): `ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `undefined`\>; \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): `ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6196

The schema reference.

#### Call Signature

> \<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): `ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `undefined`\>

Creates an object with rest schema.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

##### Returns

`ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `undefined`\>

An object with rest schema.

#### Call Signature

> \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): `ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `TMessage`\>

Creates an object with rest schema.

##### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](ObjectWithRestIssue.md)\> \| `undefined`

##### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

###### message

`TMessage`

The error message.

##### Returns

`ObjectWithRestSchema`\<`TEntries$1`, `TRest$1`, `TMessage`\>

An object with rest schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### rest

> `readonly` **rest**: `TRest$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6208

The rest schema.

***

### type

> `readonly` **type**: `"object_with_rest"`

Defined in: node\_modules/valibot/dist/index.d.mts:6192

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
