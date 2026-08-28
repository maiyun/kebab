[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ExactOptionalSchemaAsync

# Interface: ExactOptionalSchemaAsync\<TWrapped$1, TDefault\>

Defined in: node\_modules/valibot/dist/index.d.mts:4350

Exact optional schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped$1`, `never`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)

#### issue

> `readonly` **issue**: [`InferIssue`](../type-aliases/InferIssue.md)

#### output

> `readonly` **output**: [`InferOutput`](../type-aliases/InferOutput.md)

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

### default

> `readonly` **default**: `TDefault`

Defined in: node\_modules/valibot/dist/index.d.mts:4370

The default value.

***

### expects

> `readonly` **expects**: `TWrapped$1`\[`"expects"`\]

Defined in: node\_modules/valibot/dist/index.d.mts:4362

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

### reference

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:4358

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

Creates an exact optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

An exact optional schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

Creates an exact optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TDefault

`TDefault` *extends* `unknown`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### default\_

`TDefault`

The default value.

###### Returns

[`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

An exact optional schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates an exact optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`ExactOptionalSchemaAsync`\<`TWrapped$1`, `undefined`\>

An exact optional schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `ExactOptionalSchemaAsync`\<`TWrapped$1`, `TDefault`\>

Creates an exact optional schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TDefault

`TDefault` *extends* `unknown`

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### default\_

`TDefault`

The default value.

###### Returns

`ExactOptionalSchemaAsync`\<`TWrapped$1`, `TDefault`\>

An exact optional schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"exact_optional"`

Defined in: node\_modules/valibot/dist/index.d.mts:4354

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:4366

The wrapped schema.
