[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MapSchema

# Interface: MapSchema\<TKey$1, TValue$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5054

Map schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`InferMapInput`\<`TKey$1`, `TValue$1`\>, `InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

## Type Parameters

### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](MapIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferMapOutput`\<`TKey$1`, `TValue$1`\>, [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`InferMapInput`\<`TKey$1`, `TValue$1`\>, `InferMapOutput`\<`TKey$1`, `TValue$1`\>\>

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

> `readonly` **input**: `InferMapInput`

#### issue

> `readonly` **issue**: [`MapIssue`](MapIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TKey$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TValue$1`\>

#### output

> `readonly` **output**: `InferMapOutput`

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

> `readonly` **expects**: `"Map"`

Defined in: node\_modules/valibot/dist/index.d.mts:5066

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### key

> `readonly` **key**: `TKey$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5070

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

Defined in: node\_modules/valibot/dist/index.d.mts:5078

The error message.

***

### reference

> `readonly` **reference**: \{\<`TKey$1`, `TValue$1`\>(`key`, `value`): `MapSchema`\<`TKey$1`, `TValue$1`, `undefined`\>; \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `MapSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5062

The schema reference.

#### Call Signature

> \<`TKey$1`, `TValue$1`\>(`key`, `value`): `MapSchema`\<`TKey$1`, `TValue$1`, `undefined`\>

Creates a map schema.

##### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

##### Returns

`MapSchema`\<`TKey$1`, `TValue$1`, `undefined`\>

A map schema.

#### Call Signature

> \<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): `MapSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>

Creates a map schema.

##### Type Parameters

###### TKey$1

`TKey$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TValue$1

`TValue$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](MapIssue.md)\> \| `undefined`

##### Parameters

###### key

`TKey$1`

The key schema.

###### value

`TValue$1`

The value schema.

###### message

`TMessage`

The error message.

##### Returns

`MapSchema`\<`TKey$1`, `TValue$1`, `TMessage`\>

A map schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"map"`

Defined in: node\_modules/valibot/dist/index.d.mts:5058

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### value

> `readonly` **value**: `TValue$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5074

The map value schema.
