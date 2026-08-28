[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SetSchemaAsync

# Interface: SetSchemaAsync\<TValue$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6726

Set schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferSetInput`\<`TValue$1`\>, `InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

## Type Parameters

### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](SetIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferSetOutput`\<`TValue$1`\>, [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferSetInput`\<`TValue$1`\>, `InferSetOutput`\<`TValue$1`\>\>

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

> `readonly` **input**: `InferSetInput`

#### issue

> `readonly` **issue**: [`SetIssue`](SetIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>

#### output

> `readonly` **output**: `InferSetOutput`

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

> `readonly` **expects**: `"Set"`

Defined in: node\_modules/valibot/dist/index.d.mts:6738

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

Defined in: node\_modules/valibot/dist/index.d.mts:6746

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TValue$1`\>(`value`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `undefined`\>; \<`TValue$1`, `TMessage`\>(`value`, `message`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `TMessage`\>; \}) \| (\{\<`TValue$1`\>(`value`): `SetSchemaAsync`\<`TValue$1`, `undefined`\>; \<`TValue$1`, `TMessage`\>(`value`, `message`): `SetSchemaAsync`\<`TValue$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:6734

The schema reference.

#### Union Members

##### Function

\{\<`TValue$1`\>(`value`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `undefined`\>; \<`TValue$1`, `TMessage`\>(`value`, `message`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `TMessage`\>; \}

###### Call Signature

> \<`TValue$1`\>(`value`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `undefined`\>

Creates a set schema.

###### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### value

`TValue$1`

The value schema.

###### Returns

[`SetSchema`](SetSchema.md)\<`TValue$1`, `undefined`\>

A set schema.

###### Call Signature

> \<`TValue$1`, `TMessage`\>(`value`, `message`): [`SetSchema`](SetSchema.md)\<`TValue$1`, `TMessage`\>

Creates a set schema.

###### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](SetIssue.md)\> \| `undefined`

###### Parameters

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

###### Returns

[`SetSchema`](SetSchema.md)\<`TValue$1`, `TMessage`\>

A set schema.

***

##### Function

\{\<`TValue$1`\>(`value`): `SetSchemaAsync`\<`TValue$1`, `undefined`\>; \<`TValue$1`, `TMessage`\>(`value`, `message`): `SetSchemaAsync`\<`TValue$1`, `TMessage`\>; \}

###### Call Signature

> \<`TValue$1`\>(`value`): `SetSchemaAsync`\<`TValue$1`, `undefined`\>

Creates a set schema.

###### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### value

`TValue$1`

The value schema.

###### Returns

`SetSchemaAsync`\<`TValue$1`, `undefined`\>

A set schema.

###### Call Signature

> \<`TValue$1`, `TMessage`\>(`value`, `message`): `SetSchemaAsync`\<`TValue$1`, `TMessage`\>

Creates a set schema.

###### Type Parameters

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SetIssue`](SetIssue.md)\> \| `undefined`

###### Parameters

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

###### Returns

`SetSchemaAsync`\<`TValue$1`, `TMessage`\>

A set schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"set"`

Defined in: node\_modules/valibot/dist/index.d.mts:6730

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### value

> `readonly` **value**: `TValue$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6742

The set value schema.
