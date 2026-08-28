[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseSchema

# Interface: BaseSchema\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3065

Base schema interface.

## Extended by

- [`AnySchema`](AnySchema.md)
- [`ArraySchema`](ArraySchema.md)
- [`BigintSchema`](BigintSchema.md)
- [`BlobSchema`](BlobSchema.md)
- [`BooleanSchema`](BooleanSchema.md)
- [`CustomSchema`](CustomSchema.md)
- [`DateSchema`](DateSchema.md)
- [`EnumSchema`](EnumSchema.md)
- [`ExactOptionalSchema`](ExactOptionalSchema.md)
- [`FileSchema`](FileSchema.md)
- [`FunctionSchema`](FunctionSchema.md)
- [`InstanceSchema`](InstanceSchema.md)
- [`IntersectSchema`](IntersectSchema.md)
- [`LazySchema`](LazySchema.md)
- [`LiteralSchema`](LiteralSchema.md)
- [`LooseObjectSchema`](LooseObjectSchema.md)
- [`LooseTupleSchema`](LooseTupleSchema.md)
- [`MapSchema`](MapSchema.md)
- [`NanSchema`](NanSchema.md)
- [`NeverSchema`](NeverSchema.md)
- [`NonNullableSchema`](NonNullableSchema.md)
- [`NonNullishSchema`](NonNullishSchema.md)
- [`NonOptionalSchema`](NonOptionalSchema.md)
- [`NullSchema`](NullSchema.md)
- [`NullableSchema`](NullableSchema.md)
- [`NullishSchema`](NullishSchema.md)
- [`NumberSchema`](NumberSchema.md)
- [`ObjectSchema`](ObjectSchema.md)
- [`ObjectWithRestSchema`](ObjectWithRestSchema.md)
- [`OptionalSchema`](OptionalSchema.md)
- [`PicklistSchema`](PicklistSchema.md)
- [`PromiseSchema`](PromiseSchema.md)
- [`RecordSchema`](RecordSchema.md)
- [`SetSchema`](SetSchema.md)
- [`StrictObjectSchema`](StrictObjectSchema.md)
- [`StrictTupleSchema`](StrictTupleSchema.md)
- [`StringSchema`](StringSchema.md)
- [`SymbolSchema`](SymbolSchema.md)
- [`TupleSchema`](TupleSchema.md)
- [`TupleWithRestSchema`](TupleWithRestSchema.md)
- [`UndefinedSchema`](UndefinedSchema.md)
- [`UndefinedableSchema`](UndefinedableSchema.md)
- [`UnionSchema`](UnionSchema.md)
- [`UnknownSchema`](UnknownSchema.md)
- [`VariantSchema`](VariantSchema.md)
- [`VoidSchema`](VoidSchema.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, `TIssue`\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, `TIssue`\>

The output dataset.

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TInput$1`, `TOutput$1`\>

Defined in: node\_modules/valibot/dist/index.d.mts:3091

**`Internal`**

The Standard Schema properties.

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

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3085

Whether it's async.

***

### expects

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3081

The expected property.

***

### kind

> `readonly` **kind**: `"schema"`

Defined in: node\_modules/valibot/dist/index.d.mts:3069

The object kind.

***

### reference

> `readonly` **reference**: (...`args`) => `BaseSchema`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3077

The schema reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseSchema`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3073

The schema type.
