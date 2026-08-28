[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NonNullishSchemaAsync

# Interface: NonNullishSchemaAsync\<TWrapped$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5575

Non nullish schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferNonNullishInput`\<`TWrapped$1`\>, `InferNonNullishOutput`\<`TWrapped$1`\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](NonNullishIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`NonNullish`\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>\>, `NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>\>

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

> `readonly` **input**: `NonNullish`

#### issue

> `readonly` **issue**: [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>

#### output

> `readonly` **output**: `NonNullish`

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

> `readonly` **expects**: `"(!null & !undefined)"`

Defined in: node\_modules/valibot/dist/index.d.mts:5587

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

Defined in: node\_modules/valibot/dist/index.d.mts:5595

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `NonNullishSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullishSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5583

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>

Creates a non nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `undefined`\>

A non nullish schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>

Creates a non nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](NonNullishIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

[`NonNullishSchema`](NonNullishSchema.md)\<`TWrapped$1`, `TMessage`\>

A non nullish schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `NonNullishSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullishSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NonNullishSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates a non nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`NonNullishSchemaAsync`\<`TWrapped$1`, `undefined`\>

A non nullish schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullishSchemaAsync`\<`TWrapped$1`, `TMessage`\>

Creates a non nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](NonNullishIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

`NonNullishSchemaAsync`\<`TWrapped$1`, `TMessage`\>

A non nullish schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"non_nullish"`

Defined in: node\_modules/valibot/dist/index.d.mts:5579

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5591

The wrapped schema.
