[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ArraySchema

# Interface: ArraySchema\<TItem$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:3816

Array schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[], [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>

## Type Parameters

### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[], [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[]\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)\<`TItem$1`\>[]

#### issue

> `readonly` **issue**: [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem$1`\>

#### output

> `readonly` **output**: [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem$1`\>[]

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

> `readonly` **expects**: `"Array"`

Defined in: node\_modules/valibot/dist/index.d.mts:3828

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### item

> `readonly` **item**: `TItem$1`

Defined in: node\_modules/valibot/dist/index.d.mts:3832

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

Defined in: node\_modules/valibot/dist/index.d.mts:3836

The error message.

***

### reference

> `readonly` **reference**: \{\<`TItem$1`\>(`item`): `ArraySchema`\<`TItem$1`, `undefined`\>; \<`TItem$1`, `TMessage`\>(`item`, `message`): `ArraySchema`\<`TItem$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:3824

The schema reference.

#### Call Signature

> \<`TItem$1`\>(`item`): `ArraySchema`\<`TItem$1`, `undefined`\>

Creates an array schema.

##### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### item

`TItem$1`

The item schema.

##### Returns

`ArraySchema`\<`TItem$1`, `undefined`\>

An array schema.

#### Call Signature

> \<`TItem$1`, `TMessage`\>(`item`, `message`): `ArraySchema`\<`TItem$1`, `TMessage`\>

Creates an array schema.

##### Type Parameters

###### TItem$1

`TItem$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

##### Parameters

###### item

`TItem$1`

The item schema.

###### message

`TMessage`

The error message.

##### Returns

`ArraySchema`\<`TItem$1`, `TMessage`\>

An array schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"array"`

Defined in: node\_modules/valibot/dist/index.d.mts:3820

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
