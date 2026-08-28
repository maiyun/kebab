[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NullishSchemaAsync

# Interface: NullishSchemaAsync\<TWrapped$1, TDefault\>

Defined in: node\_modules/valibot/dist/index.d.mts:5940

Nullish schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null` \| `undefined`, `InferNullishOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped$1`, `null` \| `undefined`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferNullishOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferNullishOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null` \| `undefined`, `InferNullishOutput`\<`TWrapped$1`, `TDefault`\>\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `null` \| `undefined`

#### issue

> `readonly` **issue**: [`InferIssue`](../type-aliases/InferIssue.md)

#### output

> `readonly` **output**: `InferNullishOutput`

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

Defined in: node\_modules/valibot/dist/index.d.mts:5960

The default value.

***

### expects

> `readonly` **expects**: \`($\{TWrapped$1\["expects"\]\} \| null \| undefined)\`

Defined in: node\_modules/valibot/dist/index.d.mts:5952

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

> `readonly` **reference**: (\{\<`TWrapped$1`\>(`wrapped`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `TDefault`\>; \}) \| (\{\<`TWrapped$1`\>(`wrapped`): `NullishSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullishSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:5948

The schema reference.

#### Union Members

##### Function

\{\<`TWrapped$1`\>(`wrapped`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `undefined`\>

Creates a nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

[`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `undefined`\>

A nullish schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `TDefault`\>

Creates a nullish schema.

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

[`NullishSchema`](NullishSchema.md)\<`TWrapped$1`, `TDefault`\>

A nullish schema.

***

##### Function

\{\<`TWrapped$1`\>(`wrapped`): `NullishSchemaAsync`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullishSchemaAsync`\<`TWrapped$1`, `TDefault`\>; \}

###### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `NullishSchemaAsync`\<`TWrapped$1`, `undefined`\>

Creates a nullish schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### Returns

`NullishSchemaAsync`\<`TWrapped$1`, `undefined`\>

A nullish schema.

###### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `NullishSchemaAsync`\<`TWrapped$1`, `TDefault`\>

Creates a nullish schema.

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

`NullishSchemaAsync`\<`TWrapped$1`, `TDefault`\>

A nullish schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"nullish"`

Defined in: node\_modules/valibot/dist/index.d.mts:5944

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:5956

The wrapped schema.
