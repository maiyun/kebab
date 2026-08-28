[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / LazySchemaAsync

# Interface: LazySchemaAsync\<TWrapped$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:4713

Lazy schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped$1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

### expects

> `readonly` **expects**: `"unknown"`

Defined in: node\_modules/valibot/dist/index.d.mts:4725

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### getter

> `readonly` **getter**: (`input`) => `MaybePromise`\<`TWrapped$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4729

The schema getter.

#### Parameters

##### input

`unknown`

#### Returns

`MaybePromise`\<`TWrapped$1`\>

***

### kind

> `readonly` **kind**: `"schema"`

Defined in: node\_modules/valibot/dist/index.d.mts:3069

The object kind.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`kind`](BaseSchema.md#kind)

***

### reference

> `readonly` **reference**: (\<`TWrapped$1`\>(`getter`) => [`LazySchema`](LazySchema.md)\<`TWrapped$1`\>) \| (\<`TWrapped$1`\>(`getter`) => `LazySchemaAsync`\<`TWrapped$1`\>)

Defined in: node\_modules/valibot/dist/index.d.mts:4721

The schema reference.

#### Union Members

##### Function

\<`TWrapped$1`\>(`getter`) => [`LazySchema`](LazySchema.md)\<`TWrapped$1`\>

Creates a lazy schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### getter

(`input`) => `TWrapped$1`

The schema getter.

###### Returns

[`LazySchema`](LazySchema.md)\<`TWrapped$1`\>

A lazy schema.

***

##### Function

\<`TWrapped$1`\>(`getter`) => `LazySchemaAsync`\<`TWrapped$1`\>

Creates a lazy schema.

###### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### Parameters

###### getter

(`input`) => `MaybePromise`\<`TWrapped$1`\>

The schema getter.

###### Returns

`LazySchemaAsync`\<`TWrapped$1`\>

A lazy schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"lazy"`

Defined in: node\_modules/valibot/dist/index.d.mts:4717

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
