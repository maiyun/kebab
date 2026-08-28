[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NonNullableSchemaAsync

# Interface: NonNullableSchemaAsync\<TWrapped$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5452

Non nullable schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferNonNullableInput`\<`TWrapped$1`\>, `InferNonNullableOutput`\<`TWrapped$1`\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](NonNullableIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`NonNullable$1`\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>\>, `NonNullable$1`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>\>

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

> `readonly` **input**: `NonNullable$1`

#### issue

> `readonly` **issue**: [`NonNullableIssue`](NonNullableIssue.md) \| `InferNonNullableIssue`\<`TWrapped$1`\>

#### output

> `readonly` **output**: `NonNullable$1`

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

> `readonly` **expects**: `"!null"`

Defined in: node\_modules/valibot/dist/index.d.mts:5464

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

Defined in: node\_modules/valibot/dist/index.d.mts:5472

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `NonNullableSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullableSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5460

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>

Creates a non nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `undefined`\>

A non nullable schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>

Creates a non nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](NonNullableIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

[`NonNullableSchema`](NonNullableSchema.md)\<`TWrapped$1`, `TMessage`\>

A non nullable schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `NonNullableSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullableSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NonNullableSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates a non nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`NonNullableSchemaAsync`\<`TWrapped$1`, `undefined`\>

A non nullable schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullableSchemaAsync`\<`TWrapped$1`, `TMessage`\>

Creates a non nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](NonNullableIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

`NonNullableSchemaAsync`\<`TWrapped$1`, `TMessage`\>

A non nullable schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"non_nullable"`

Defined in: node\_modules/valibot/dist/index.d.mts:5456

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5468

The wrapped schema.
