[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NonNullableSchema

# Interface: NonNullableSchema\<TWrapped$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5408

Non nullable schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferNonNullableInput`\<`TWrapped$1`\>, `InferNonNullableOutput`\<`TWrapped$1`\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](NonNullableIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`NonNullable$1`\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>\>, `NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>\>

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

> `readonly` **input**: `NonNullable$1`

#### issue

> `readonly` **issue**: [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>

#### output

> `readonly` **output**: `NonNullable$1`

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

> `readonly` **expects**: `"!null"`

Defined in: node\_modules/valibot/dist/index.d.mts:5420

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

Defined in: node\_modules/valibot/dist/index.d.mts:5428

The error message.

***

### reference

> `readonly` **reference**: \{\<`TWrapped$1`\>(`wrapped`): `NonNullableSchema`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullableSchema`\<`TWrapped$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5416

The schema reference.

#### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NonNullableSchema`\<`TWrapped$1`, `undefined`\>

Creates a non nullable schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

##### Returns

`NonNullableSchema`\<`TWrapped$1`, `undefined`\>

A non nullable schema.

#### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullableSchema`\<`TWrapped$1`, `TMessage`\>

Creates a non nullable schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](NonNullableIssue.md)\> \| `undefined`

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

##### Returns

`NonNullableSchema`\<`TWrapped$1`, `TMessage`\>

A non nullable schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"non_nullable"`

Defined in: node\_modules/valibot/dist/index.d.mts:5412

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5424

The wrapped schema.
