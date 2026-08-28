[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NonNullishSchema

# Interface: NonNullishSchema\<TWrapped$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5531

Non nullish schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferNonNullishInput`\<`TWrapped$1`\>, `InferNonNullishOutput`\<`TWrapped$1`\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](NonNullishIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`NonNullish`\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>\>, `NonNullish`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>\>

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

> `readonly` **input**: `NonNullish`

#### issue

> `readonly` **issue**: [`NonNullishIssue`](NonNullishIssue.md) \| `InferNonNullishIssue`\<`TWrapped$1`\>

#### output

> `readonly` **output**: `NonNullish`

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

> `readonly` **expects**: `"(!null & !undefined)"`

Defined in: node\_modules/valibot/dist/index.d.mts:5543

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

Defined in: node\_modules/valibot/dist/index.d.mts:5551

The error message.

***

### reference

> `readonly` **reference**: \{\<`TWrapped$1`\>(`wrapped`): `NonNullishSchema`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullishSchema`\<`TWrapped$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5539

The schema reference.

#### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NonNullishSchema`\<`TWrapped$1`, `undefined`\>

Creates a non nullish schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

##### Returns

`NonNullishSchema`\<`TWrapped$1`, `undefined`\>

A non nullish schema.

#### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonNullishSchema`\<`TWrapped$1`, `TMessage`\>

Creates a non nullish schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](NonNullishIssue.md)\> \| `undefined`

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

##### Returns

`NonNullishSchema`\<`TWrapped$1`, `TMessage`\>

A non nullish schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"non_nullish"`

Defined in: node\_modules/valibot/dist/index.d.mts:5535

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5547

The wrapped schema.
