[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / TupleWithRestSchema

# Interface: TupleWithRestSchema\<TItems$1, TRest$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:7238

Tuple with rest schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<\[`...InferTupleInput<TItems$1>`, `...InferInput<TRest$1>[]`\], \[`...InferTupleOutput<TItems$1>`, `...InferOutput<TRest$1>[]`\], [`TupleWithRestIssue`](TupleWithRestIssue.md) \| `InferTupleIssue`\<`TItems$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

## Type Parameters

### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleWithRestIssue`](TupleWithRestIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<\[`...InferTupleOutput<TItems$1>[]`, `...InferOutput<TRest$1>[]`\], [`TupleWithRestIssue`](TupleWithRestIssue.md) \| `InferTupleIssue`\<`TItems$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<\[`...InferTupleOutput<TItems$1>[]`, `...InferOutput<TRest$1>[]`\], [`TupleWithRestIssue`](TupleWithRestIssue.md) \| `InferTupleIssue`\<`TItems$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<\[`...InferTupleInput<TItems$1>[]`, `...InferInput<TRest$1>[]`\], \[`...InferTupleOutput<TItems$1>[]`, `...InferOutput<TRest$1>[]`\]\>

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

> `readonly` **input**: \[`...InferTupleInput<TItems$1>[]`, `...InferInput<TRest$1>[]`\]

#### issue

> `readonly` **issue**: [`TupleWithRestIssue`](TupleWithRestIssue.md) \| `InferTupleIssue`\<`TItems$1`\> \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TRest$1`\>

#### output

> `readonly` **output**: \[`...InferTupleOutput<TItems$1>[]`, `...InferOutput<TRest$1>[]`\]

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

> `readonly` **expects**: `"Array"`

Defined in: node\_modules/valibot/dist/index.d.mts:7250

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### items

> `readonly` **items**: `TItems$1`

Defined in: node\_modules/valibot/dist/index.d.mts:7254

The items schema.

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

Defined in: node\_modules/valibot/dist/index.d.mts:7262

The error message.

***

### reference

> `readonly` **reference**: \{\<`TItems$1`, `TRest$1`\>(`items`, `rest`): `TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `undefined`\>; \<`TItems$1`, `TRest$1`, `TMessage`\>(`items`, `rest`, `message`): `TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:7246

The schema reference.

#### Call Signature

> \<`TItems$1`, `TRest$1`\>(`items`, `rest`): `TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `undefined`\>

Creates a tuple with rest schema.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### items

`TItems$1`

The items schema.

###### rest

`TRest$1`

The rest schema.

##### Returns

`TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `undefined`\>

A tuple with rest schema.

#### Call Signature

> \<`TItems$1`, `TRest$1`, `TMessage`\>(`items`, `rest`, `message`): `TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `TMessage`\>

Creates a tuple with rest schema.

##### Type Parameters

###### TItems$1

`TItems$1` *extends* [`TupleItems`](../type-aliases/TupleItems.md)

###### TRest$1

`TRest$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleWithRestIssue`](TupleWithRestIssue.md)\> \| `undefined`

##### Parameters

###### items

`TItems$1`

The items schema.

###### rest

`TRest$1`

The rest schema.

###### message

`TMessage`

The error message.

##### Returns

`TupleWithRestSchema`\<`TItems$1`, `TRest$1`, `TMessage`\>

A tuple with rest schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### rest

> `readonly` **rest**: `TRest$1`

Defined in: node\_modules/valibot/dist/index.d.mts:7258

The rest schema.

***

### type

> `readonly` **type**: `"tuple_with_rest"`

Defined in: node\_modules/valibot/dist/index.d.mts:7242

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
