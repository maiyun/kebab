[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NonOptionalSchemaAsync

# Interface: NonOptionalSchemaAsync\<TWrapped$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5698

Non optional schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`InferNonOptionalInput`\<`TWrapped$1`\>, `InferNonOptionalOutput`\<`TWrapped$1`\>, [`NonOptionalIssue`](NonOptionalIssue.md) \| `InferNonOptionalIssue`\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](NonOptionalIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonOptional`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonOptionalIssue`](NonOptionalIssue.md) \| `InferNonOptionalIssue`\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`NonOptional`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>, [`NonOptionalIssue`](NonOptionalIssue.md) \| `InferNonOptionalIssue`\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`NonOptional`\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>\>, `NonOptional`\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>\>

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

> `readonly` **input**: `NonOptional`

#### issue

> `readonly` **issue**: [`NonOptionalIssue`](NonOptionalIssue.md) \| `InferNonOptionalIssue`\<`TWrapped$1`\>

#### output

> `readonly` **output**: `NonOptional`

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

> `readonly` **expects**: `"!undefined"`

Defined in: node\_modules/valibot/dist/index.d.mts:5710

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

Defined in: node\_modules/valibot/dist/index.d.mts:5718

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5706

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

Creates a non optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

A non optional schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): [`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>

Creates a non optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](NonOptionalIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

[`NonOptionalSchema`](NonOptionalSchema.md)\<`TWrapped$1`, `TMessage`\>

A non optional schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `TMessage`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates a non optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`NonOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>

A non optional schema.

###### Call Signature

> \<`TWrapped$1`, `TMessage`\>(`wrapped`, `message`): `NonOptionalSchemaAsync`\<`TWrapped$1`, `TMessage`\>

Creates a non optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](NonOptionalIssue.md)\> \| `undefined`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### message

`TMessage`

The error message.

###### Returns

`NonOptionalSchemaAsync`\<`TWrapped$1`, `TMessage`\>

A non optional schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"non_optional"`

Defined in: node\_modules/valibot/dist/index.d.mts:5702

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5714

The wrapped schema.
