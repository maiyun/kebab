[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / UnionSchema

# Interface: UnionSchema\<TOptions$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5289

Union schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TOptions$1`\[`number`\]\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

## Type Parameters

### TOptions$1

`TOptions$1` *extends* [`UnionOptions`](../type-aliases/UnionOptions.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\> \| [`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\> \| [`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TOptions$1`\[`number`\]\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)

#### issue

> `readonly` **issue**: [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\> \| [`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

#### output

> `readonly` **output**: [`InferOutput`](../type-aliases/InferOutput.md)

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

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3081

The expected property.

#### Inherited from

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

Defined in: node\_modules/valibot/dist/index.d.mts:5305

The error message.

***

### options

> `readonly` **options**: `TOptions$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5301

The union options.

***

### reference

> `readonly` **reference**: \{\<`TOptions$1`\>(`options`): `UnionSchema`\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): `UnionSchema`\<`TOptions$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5297

The schema reference.

#### Call Signature

> \<`TOptions$1`\>(`options`): `UnionSchema`\<`TOptions$1`, `undefined`\>

Creates an union schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`UnionOptions`](../type-aliases/UnionOptions.md)

##### Parameters

###### options

`TOptions$1`

The union options.

##### Returns

`UnionSchema`\<`TOptions$1`, `undefined`\>

An union schema.

#### Call Signature

> \<`TOptions$1`, `TMessage`\>(`options`, `message`): `UnionSchema`\<`TOptions$1`, `TMessage`\>

Creates an union schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`UnionOptions`](../type-aliases/UnionOptions.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UnionIssue`](UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\> \| `undefined`

##### Parameters

###### options

`TOptions$1`

The union options.

###### message

`TMessage`

The error message.

##### Returns

`UnionSchema`\<`TOptions$1`, `TMessage`\>

An union schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"union"`

Defined in: node\_modules/valibot/dist/index.d.mts:5293

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
