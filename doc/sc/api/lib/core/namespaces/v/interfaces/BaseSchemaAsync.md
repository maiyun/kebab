[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseSchemaAsync

# Interface: BaseSchemaAsync\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3117

Base schema async interface.

## Extends

- `Omit`\<[`BaseSchema`](BaseSchema.md)\<`TInput$1`, `TOutput$1`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

## Extended by

- [`ArraySchemaAsync`](ArraySchemaAsync.md)
- [`CustomSchemaAsync`](CustomSchemaAsync.md)
- [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)
- [`IntersectSchemaAsync`](IntersectSchemaAsync.md)
- [`LazySchemaAsync`](LazySchemaAsync.md)
- [`LooseObjectSchemaAsync`](LooseObjectSchemaAsync.md)
- [`LooseTupleSchemaAsync`](LooseTupleSchemaAsync.md)
- [`MapSchemaAsync`](MapSchemaAsync.md)
- [`NonNullableSchemaAsync`](NonNullableSchemaAsync.md)
- [`NonNullishSchemaAsync`](NonNullishSchemaAsync.md)
- [`NonOptionalSchemaAsync`](NonOptionalSchemaAsync.md)
- [`NullableSchemaAsync`](NullableSchemaAsync.md)
- [`NullishSchemaAsync`](NullishSchemaAsync.md)
- [`ObjectSchemaAsync`](ObjectSchemaAsync.md)
- [`ObjectWithRestSchemaAsync`](ObjectWithRestSchemaAsync.md)
- [`OptionalSchemaAsync`](OptionalSchemaAsync.md)
- [`RecordSchemaAsync`](RecordSchemaAsync.md)
- [`SetSchemaAsync`](SetSchemaAsync.md)
- [`StrictObjectSchemaAsync`](StrictObjectSchemaAsync.md)
- [`StrictTupleSchemaAsync`](StrictTupleSchemaAsync.md)
- [`TupleSchemaAsync`](TupleSchemaAsync.md)
- [`TupleWithRestSchemaAsync`](TupleWithRestSchemaAsync.md)
- [`UndefinedableSchemaAsync`](UndefinedableSchemaAsync.md)
- [`UnionSchemaAsync`](UnionSchemaAsync.md)
- [`VariantSchemaAsync`](VariantSchemaAsync.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, `TIssue`\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, `TIssue`\>\>

The output dataset.

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3091

**`Internal`**

The Standard Schema properties.

#### Inherited from

`Omit.~standard`

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3108

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `TIssue`

#### output

> `readonly` **output**: `TOutput$1`

#### Inherited from

`Omit.~types`

***

### async

> `readonly` **async**: `true`

Defined in: node\_modules/valibot/dist/index.d.mts:3125

Whether it's async.

***

### expects

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3081

The expected property.

#### Inherited from

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

> `readonly` **reference**: (...`args`) => [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseSchemaAsync`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3121

The schema reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| `BaseSchemaAsync`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3073

The schema type.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
