[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ArraySchemaAsync

# Interface: ArraySchemaAsync\<TItem$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:3860

Array schema interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[], [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>

## Type Parameters

### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[], [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[]\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[]

#### issue

> `readonly` **issue**: [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>

#### output

> `readonly` **output**: [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[]

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

> `readonly` **expects**: `"Array"`

Defined in: node\_modules/valibot/dist/index.d.mts:3872

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### item

> `readonly` **item**: `TItem$1`

Defined in: node\_modules/valibot/dist/index.d.mts:3876

The array item schema.

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

Defined in: node\_modules/valibot/dist/index.d.mts:3880

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TItem$1`\>(`item`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `undefined`\>; \<`TItem$1`, `TMessage`\>(`item`, `message`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `TMessage`\>; \}) \| (\{\<`TItem$1`\>(`item`): `ArraySchemaAsync`\<`TItem$1`, `undefined`\>; \<`TItem$1`, `TMessage`\>(`item`, `message`): `ArraySchemaAsync`\<`TItem$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:3868

The schema reference.

#### Union Members

##### Function

\{\<`TItem$1`\>(`item`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `undefined`\>; \<`TItem$1`, `TMessage`\>(`item`, `message`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `TMessage`\>; \}

###### Call Signature

> \<`TItem$1`\>(`item`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `undefined`\>

Creates an array schema.

###### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### item

`TItem$1`

The item schema.

###### Returns

[`ArraySchema`](ArraySchema.md)\<`TItem$1`, `undefined`\>

An array schema.

###### Call Signature

> \<`TItem$1`, `TMessage`\>(`item`, `message`): [`ArraySchema`](ArraySchema.md)\<`TItem$1`, `TMessage`\>

Creates an array schema.

###### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

###### Parameters

###### item

`TItem$1`

The item schema.

###### message

`TMessage`

The error message.

###### Returns

[`ArraySchema`](ArraySchema.md)\<`TItem$1`, `TMessage`\>

An array schema.

***

##### Function

\{\<`TItem$1`\>(`item`): `ArraySchemaAsync`\<`TItem$1`, `undefined`\>; \<`TItem$1`, `TMessage`\>(`item`, `message`): `ArraySchemaAsync`\<`TItem$1`, `TMessage`\>; \}

###### Call Signature

> \<`TItem$1`\>(`item`): `ArraySchemaAsync`\<`TItem$1`, `undefined`\>

Creates an array schema.

###### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### item

`TItem$1`

The item schema.

###### Returns

`ArraySchemaAsync`\<`TItem$1`, `undefined`\>

An array schema.

###### Call Signature

> \<`TItem$1`, `TMessage`\>(`item`, `message`): `ArraySchemaAsync`\<`TItem$1`, `TMessage`\>

Creates an array schema.

###### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

###### Parameters

###### item

`TItem$1`

The item schema.

###### message

`TMessage`

The error message.

###### Returns

`ArraySchemaAsync`\<`TItem$1`, `TMessage`\>

An array schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"array"`

Defined in: node\_modules/valibot/dist/index.d.mts:3864

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
