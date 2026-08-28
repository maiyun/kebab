[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NullableSchemaAsync

# Interface: NullableSchemaAsync\<TWrapped$1, TDefault\>

Defined in: node\_modules/valibot/dist/index.d.mts:5846

Nullable schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null`, `InferNullableOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped$1`, `null`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferNullableOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferNullableOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null`, `InferNullableOutput`\<`TWrapped$1`, `TDefault`\>\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null`

#### issue

> `readonly` **issue**: [`InferIssue`](../type-aliases/InferIssue.md)

#### output

> `readonly` **output**: `InferNullableOutput`

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

Defined in: node\_modules/valibot/dist/index.d.mts:5866

The default value.

***

### expects

> `readonly` **expects**: \`($\{TWrapped$1\["expects"\]\} \| null)\`

Defined in: node\_modules/valibot/dist/index.d.mts:5858

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

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `TDefault`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `NullableSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullableSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5854

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `undefined`\>

Creates a nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `undefined`\>

A nullable schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `TDefault`\>

Creates a nullable schema.

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

[`NullableSchema`](NullableSchema.md)\<`TWrapped$1`, `TDefault`\>

A nullable schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `NullableSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullableSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NullableSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates a nullable schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`NullableSchemaAsync`\<`TWrapped$1`, `undefined`\>

A nullable schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullableSchemaAsync`\<`TWrapped$1`, `TDefault`\>

Creates a nullable schema.

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

`NullableSchemaAsync`\<`TWrapped$1`, `TDefault`\>

A nullable schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"nullable"`

Defined in: node\_modules/valibot/dist/index.d.mts:5850

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5862

The wrapped schema.
