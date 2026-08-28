[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / OptionalSchema

# Interface: OptionalSchema\<TWrapped$1, TDefault\>

Defined in: node\_modules/valibot/dist/index.d.mts:6298

Optional schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `undefined`, `InferOptionalOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

## Type Parameters

### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`Default`](../type-aliases/Default.md)\<`TWrapped$1`, `undefined`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferOptionalOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`InferOptionalOutput`\<`TWrapped$1`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped$1`\>\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `undefined`, `InferOptionalOutput`\<`TWrapped$1`, `TDefault`\>\>

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

> `readonly` **input**: [`InferInput`](../type-aliases/InferInput.md)\<`TWrapped$1`\> \| `undefined`

#### issue

> `readonly` **issue**: [`InferIssue`](../type-aliases/InferIssue.md)

#### output

> `readonly` **output**: `InferOptionalOutput`

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

### default

> `readonly` **default**: `TDefault`

Defined in: node\_modules/valibot/dist/index.d.mts:6318

The default value.

***

### expects

> `readonly` **expects**: \`($\{TWrapped$1\["expects"\]\} \| undefined)\`

Defined in: node\_modules/valibot/dist/index.d.mts:6310

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

> `readonly` **reference**: \{\<`TWrapped$1`\>(`wrapped`): `OptionalSchema`\<`TWrapped$1`, `undefined`\>; \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `OptionalSchema`\<`TWrapped$1`, `TDefault`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6306

The schema reference.

#### Call Signature

> \<`TWrapped$1`\>(`wrapped`): `OptionalSchema`\<`TWrapped$1`, `undefined`\>

Creates an optional schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

##### Returns

`OptionalSchema`\<`TWrapped$1`, `undefined`\>

An optional schema.

#### Call Signature

> \<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): `OptionalSchema`\<`TWrapped$1`, `TDefault`\>

Creates an optional schema.

##### Type Parameters

###### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

###### TDefault

`TDefault` *extends* `unknown`

##### Parameters

###### wrapped

`TWrapped$1`

The wrapped schema.

###### default\_

`TDefault`

The default value.

##### Returns

`OptionalSchema`\<`TWrapped$1`, `TDefault`\>

An optional schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"optional"`

Defined in: node\_modules/valibot/dist/index.d.mts:6302

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6314

The wrapped schema.
