[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RecordSchema

# Interface: RecordSchema\<TKey$1, TValue$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6555

Record schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferRecordInput`\<`TKey$1`, `TValue$1`\>, `InferRecordOutput`\<`TKey$1`, `TValue$1`\>, [`RecordIssue`](RecordIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

## Type Parameters

### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`string`, `string` \| `number` \| `symbol`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RecordIssue`](RecordIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: WithReadonly\<TValue$1, WithQuestionMarks\<Record\<InferOutput\<TKey$1\>, InferOutput\<TValue$1\>\>\>\>\[TKey\] \}, [`RecordIssue`](RecordIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\{ \[TKey in string \| number \| symbol\]: WithReadonly\<TValue$1, WithQuestionMarks\<Record\<InferOutput\<TKey$1\>, InferOutput\<TValue$1\>\>\>\>\[TKey\] \}, [`RecordIssue`](RecordIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`{ [TKey in string]: WithQuestionMarks<Record<InferInput<TKey$1>, InferInput<TValue$1>>>[TKey] }`, \{ \[TKey in string \| number \| symbol\]: WithReadonly\<TValue$1, WithQuestionMarks\<Record\<InferOutput\<TKey$1\>, InferOutput\<TValue$1\>\>\>\>\[TKey\] \}\>

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

> `readonly` **input**: `{ [TKey in string]: WithQuestionMarks<Record<InferInput<TKey$1>, InferInput<TValue$1>>>[TKey] }`

#### issue

> `readonly` **issue**: [`RecordIssue`](RecordIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>

#### output

> `readonly` **output**: \{ \[TKey in string \| number \| symbol\]: WithReadonly\<TValue$1, WithQuestionMarks\<Record\<InferOutput\<TKey$1\>, InferOutput\<TValue$1\>\>\>\>\[TKey\] \}

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

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:6567

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### key

> `readonly` **key**: `TKey$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6571

The record key schema.

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

Defined in: node\_modules/valibot/dist/index.d.mts:6579

The error message.

***

### reference

> `readonly` **reference**: \{\<`TKey$1`, `TValue$1`\>(`key`, `value`): `RecordSchema`\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `RecordSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6563

The schema reference.

#### Call Signature

> \<`TKey$1`, `TValue$1`\>(`key`, `value`): `RecordSchema`\<`TKey$1`, `TValue$1`, `undefined`\>

Creates a record schema.

##### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`string`, `string` \| `number` \| `symbol`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

##### Returns

`RecordSchema`\<`TKey$1`, `TValue$1`, `undefined`\>

A record schema.

#### Call Signature

> \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `RecordSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>

Creates a record schema.

##### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`string`, `string` \| `number` \| `symbol`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RecordIssue`](RecordIssue.md)\> \| `undefined`

##### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

##### Returns

`RecordSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>

A record schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"record"`

Defined in: node\_modules/valibot/dist/index.d.mts:6559

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### value

> `readonly` **value**: `TValue$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6575

The record value schema.
