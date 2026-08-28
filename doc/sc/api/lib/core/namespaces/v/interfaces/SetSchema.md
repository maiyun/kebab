[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SetSchema

# Interface: SetSchema\<TValue$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6682

Set schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferSetInput`\<`TValue$1`\>, `InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

## Type Parameters

### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](SetIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferSetInput`\<`TValue$1`\>, `InferSetOutput`\<`TValue$1`\>\>

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

> `readonly` **input**: `InferSetInput`

#### issue

> `readonly` **issue**: [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>

#### output

> `readonly` **output**: `InferSetOutput`

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

> `readonly` **expects**: `"Set"`

Defined in: node\_modules/valibot/dist/index.d.mts:6694

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

Defined in: node\_modules/valibot/dist/index.d.mts:6702

The error message.

***

### reference

> `readonly` **reference**: \{\<`TValue$1`\>(`value`): `SetSchema`\<`TValue$1`, `undefined`\>; \<`TValue$1`, `TMessage`\>(`value`, `message`): `SetSchema`\<`TValue$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6690

The schema reference.

#### Call Signature

> \<`TValue$1`\>(`value`): `SetSchema`\<`TValue$1`, `undefined`\>

Creates a set schema.

##### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### value

`TValue$1`

The value schema.

##### Returns

`SetSchema`\<`TValue$1`, `undefined`\>

A set schema.

#### Call Signature

> \<`TValue$1`, `TMessage`\>(`value`, `message`): `SetSchema`\<`TValue$1`, `TMessage`\>

Creates a set schema.

##### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](SetIssue.md)\> \| `undefined`

##### Parameters

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

##### Returns

`SetSchema`\<`TValue$1`, `TMessage`\>

A set schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"set"`

Defined in: node\_modules/valibot/dist/index.d.mts:6686

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### value

> `readonly` **value**: `TValue$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6698

The set value schema.
