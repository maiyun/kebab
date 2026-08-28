[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ObjectWithRestSchemaAsync

# Interface: ObjectWithRestSchemaAsync\<TEntries$1, TRest$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6238

Object schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferObjectInput`\<`TEntries$1`\> & `object`, `InferObjectOutput`\<`TEntries$1`\> & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

## Type Parameters

### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](ObjectWithRestIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: OutputWithReadonly\<TEntries$1, OutputWithQuestionMarks\<TEntries$1, InferEntriesOutput\<TEntries$1\>\>\>\[TKey\] \} & `object`, [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>\>

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

> `readonly` **issue**: [`ObjectWithRestIssue`](ObjectWithRestIssue.md) \| `InferObjectIssue`\<`TEntries$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>

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

Defined in: node\_modules/valibot/dist/index.d.mts:6258

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6254

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

Defined in: node\_modules/valibot/dist/index.d.mts:6266

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>; \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>; \}) \| (\{\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `undefined`\>; \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:6250

The schema reference.

#### Union Members

##### Function

\{\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>; \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

Creates an object with rest schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

###### Returns

[`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

An object with rest schema.

###### Call Signature

> \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): [`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

Creates an object with rest schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](ObjectEntries.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](ObjectWithRestIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

###### message

`TMessage`

The error message.

###### Returns

[`ObjectWithRestSchema`](ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

An object with rest schema.

***

##### Function

\{\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `undefined`\>; \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `TMessage`\>; \}

###### Call Signature

> \<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `undefined`\>

Creates an object with rest schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

###### Returns

`ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `undefined`\>

An object with rest schema.

###### Call Signature

> \<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): `ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `TMessage`\>

Creates an object with rest schema.

###### Type Parameters

###### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](ObjectEntriesAsync.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](ObjectWithRestIssue.md)\> \| `undefined`

###### Parameters

###### entries

`TEntries$1`

The entries schema.

###### rest

`TRest$1`

The rest schema.

###### message

`TMessage`

The error message.

###### Returns

`ObjectWithRestSchemaAsync`\<`TEntries$1`, `TRest$1`, `TMessage`\>

An object with rest schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### rest

> `readonly` **rest**: `TRest$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6262

The rest schema.

***

### type

> `readonly` **type**: `"object_with_rest"`

Defined in: node\_modules/valibot/dist/index.d.mts:6246

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
