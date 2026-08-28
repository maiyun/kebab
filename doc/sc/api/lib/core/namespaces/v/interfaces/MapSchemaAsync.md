[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MapSchemaAsync

# Interface: MapSchemaAsync\<TKey$1, TValue$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5104

Map schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferMapInput`\<`TKey$1`, `TValue$1`\>, `InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

## Type Parameters

### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](MapIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferMapInput`\<`TKey$1`, `TValue$1`\>, `InferMapOutput`\<`TKey$1`, `TValue$1`\>\>

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

> `readonly` **input**: `InferMapInput`

#### issue

> `readonly` **issue**: [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>

#### output

> `readonly` **output**: `InferMapOutput`

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

> `readonly` **expects**: `"Map"`

Defined in: node\_modules/valibot/dist/index.d.mts:5116

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### key

> `readonly` **key**: `TKey$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5120

The map key schema.

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

Defined in: node\_modules/valibot/dist/index.d.mts:5128

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TKey$1`, `TValue$1`\>(`key`, `value`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>; \}) \| (\{\<`TKey$1`, `TValue$1`\>(`key`, `value`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5112

The schema reference.

#### Union Members

##### Function

\{\<`TKey$1`, `TValue$1`\>(`key`, `value`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>; \}

###### Call Signature

> \<`TKey$1`, `TValue$1`\>(`key`, `value`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>

Creates a map schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### Returns

[`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>

A map schema.

###### Call Signature

> \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): [`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

Creates a map schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](MapIssue.md)\> \| `undefined`

###### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

###### Returns

[`MapSchema`](MapSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

A map schema.

***

##### Function

\{\<`TKey$1`, `TValue$1`\>(`key`, `value`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `TMessage`\>; \}

###### Call Signature

> \<`TKey$1`, `TValue$1`\>(`key`, `value`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `undefined`\>

Creates a map schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### Returns

`MapSchemaAsync`\<`TKey$1`, `TValue$1`, `undefined`\>

A map schema.

###### Call Signature

> \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `MapSchemaAsync`\<`TKey$1`, `TValue$1`, `TMessage`\>

Creates a map schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](MapIssue.md)\> \| `undefined`

###### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

###### Returns

`MapSchemaAsync`\<`TKey$1`, `TValue$1`, `TMessage`\>

A map schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"map"`

Defined in: node\_modules/valibot/dist/index.d.mts:5108

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### value

> `readonly` **value**: `TValue$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5124

The map value schema.
