[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IntersectSchema

# Interface: IntersectSchema\<TOptions$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4602

Intersect schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferIntersectInput`\<`TOptions$1`\>, `InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

## Type Parameters

### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](IntersectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferIntersectInput`\<`TOptions$1`\>, `InferIntersectOutput`\<`TOptions$1`\>\>

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

> `readonly` **input**: `InferIntersectInput`

#### issue

> `readonly` **issue**: [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>

#### output

> `readonly` **output**: `InferIntersectOutput`

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

Defined in: node\_modules/valibot/dist/index.d.mts:4618

The error message.

***

### options

> `readonly` **options**: `TOptions$1`

Defined in: node\_modules/valibot/dist/index.d.mts:4614

The intersect options.

***

### reference

> `readonly` **reference**: \{\<`TOptions$1`\>(`options`): `IntersectSchema`\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): `IntersectSchema`\<`TOptions$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4610

The schema reference.

#### Call Signature

> \<`TOptions$1`\>(`options`): `IntersectSchema`\<`TOptions$1`, `undefined`\>

Creates an intersect schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

##### Parameters

###### options

`TOptions$1`

The intersect options.

##### Returns

`IntersectSchema`\<`TOptions$1`, `undefined`\>

An intersect schema.

#### Call Signature

> \<`TOptions$1`, `TMessage`\>(`options`, `message`): `IntersectSchema`\<`TOptions$1`, `TMessage`\>

Creates an intersect schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](IntersectIssue.md)\> \| `undefined`

##### Parameters

###### options

`TOptions$1`

The intersect options.

###### message

`TMessage`

The error message.

##### Returns

`IntersectSchema`\<`TOptions$1`, `TMessage`\>

An intersect schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"intersect"`

Defined in: node\_modules/valibot/dist/index.d.mts:4606

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
