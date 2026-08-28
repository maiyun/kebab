[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / IntersectSchemaAsync

# Interface: IntersectSchemaAsync\<TOptions$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4642

Intersect schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferIntersectInput`\<`TOptions$1`\>, `InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>

## Type Parameters

### TOptions$1

`TOptions$1` *extends* [`IntersectOptionsAsync`](../type-aliases/IntersectOptionsAsync.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](IntersectIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferIntersectOutput`\<`TOptions$1`\>, [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferIntersectInput`\<`TOptions$1`\>, `InferIntersectOutput`\<`TOptions$1`\>\>

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

> `readonly` **input**: `InferIntersectInput`

#### issue

> `readonly` **issue**: [`IntersectIssue`](IntersectIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>

#### output

> `readonly` **output**: `InferIntersectOutput`

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

Defined in: node\_modules/valibot/dist/index.d.mts:4658

The error message.

***

### options

> `readonly` **options**: `TOptions$1`

Defined in: node\_modules/valibot/dist/index.d.mts:4654

The intersect options.

***

### reference

> `readonly` **reference**: (\{\<`TOptions$1`\>(`options`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `TMessage`\>; \}) \| (\{\<`TOptions$1`\>(`options`): `IntersectSchemaAsync`\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): `IntersectSchemaAsync`\<`TOptions$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:4650

The schema reference.

#### Union Members

##### Function

\{\<`TOptions$1`\>(`options`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `TMessage`\>; \}

###### Call Signature

> \<`TOptions$1`\>(`options`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `undefined`\>

Creates an intersect schema.

###### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

###### Parameters

###### options

`TOptions$1`

The intersect options.

###### Returns

[`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `undefined`\>

An intersect schema.

###### Call Signature

> \<`TOptions$1`, `TMessage`\>(`options`, `message`): [`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `TMessage`\>

Creates an intersect schema.

###### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](IntersectIssue.md)\> \| `undefined`

###### Parameters

###### options

`TOptions$1`

The intersect options.

###### message

`TMessage`

The error message.

###### Returns

[`IntersectSchema`](IntersectSchema.md)\<`TOptions$1`, `TMessage`\>

An intersect schema.

***

##### Function

\{\<`TOptions$1`\>(`options`): `IntersectSchemaAsync`\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): `IntersectSchemaAsync`\<`TOptions$1`, `TMessage`\>; \}

###### Call Signature

> \<`TOptions$1`\>(`options`): `IntersectSchemaAsync`\<`TOptions$1`, `undefined`\>

Creates an intersect schema.

###### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptionsAsync`](../type-aliases/IntersectOptionsAsync.md)

###### Parameters

###### options

`TOptions$1`

The intersect options.

###### Returns

`IntersectSchemaAsync`\<`TOptions$1`, `undefined`\>

An intersect schema.

###### Call Signature

> \<`TOptions$1`, `TMessage`\>(`options`, `message`): `IntersectSchemaAsync`\<`TOptions$1`, `TMessage`\>

Creates an intersect schema.

###### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`IntersectOptionsAsync`](../type-aliases/IntersectOptionsAsync.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](IntersectIssue.md)\> \| `undefined`

###### Parameters

###### options

`TOptions$1`

The intersect options.

###### message

`TMessage`

The error message.

###### Returns

`IntersectSchemaAsync`\<`TOptions$1`, `TMessage`\>

An intersect schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"intersect"`

Defined in: node\_modules/valibot/dist/index.d.mts:4646

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
