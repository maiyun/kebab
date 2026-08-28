[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / VariantSchemaAsync

# Interface: VariantSchemaAsync\<TKey$1, TOptions$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:7561

Variant schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TOptions$1`\[`number`\]\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`VariantIssue`](VariantIssue.md) \| `InferVariantIssue`\<`TOptions$1`\>\>

## Type Parameters

### TKey$1

`TKey$1` *extends* `string`

### TOptions$1

`TOptions$1` *extends* [`VariantOptionsAsync`](../type-aliases/VariantOptionsAsync.md)\<`TKey$1`\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`VariantIssue`](VariantIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`VariantIssue`](VariantIssue.md) \| `Exclude`\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>, \{ `type`: `"object"` \| `"loose_object"` \| `"object_with_rest"`; \}\>\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>, [`VariantIssue`](VariantIssue.md) \| `Exclude`\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>, \{ `type`: `"object"` \| `"loose_object"` \| `"object_with_rest"`; \}\>\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TOptions$1`\[`number`\]\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TOptions$1`\[`number`\]\>\>

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

> `readonly` **issue**: [`VariantIssue`](VariantIssue.md) \| `Exclude`\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>, \{ `type`: `"object"` \| `"loose_object"` \| `"object_with_rest"`; \}\>

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

> `readonly` **expects**: `"Object"`

Defined in: node\_modules/valibot/dist/index.d.mts:7573

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### key

> `readonly` **key**: `TKey$1`

Defined in: node\_modules/valibot/dist/index.d.mts:7577

The discriminator key.

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

Defined in: node\_modules/valibot/dist/index.d.mts:7585

The error message.

***

### options

> `readonly` **options**: `TOptions$1`

Defined in: node\_modules/valibot/dist/index.d.mts:7581

The variant options.

***

### reference

> `readonly` **reference**: (\{\<`TKey$1`, `TOptions$1`\>(`key`, `options`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>; \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>; \}) \| (\{\<`TKey$1`, `TOptions$1`\>(`key`, `options`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `undefined`\>; \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:7569

The schema reference.

#### Union Members

##### Function

\{\<`TKey$1`, `TOptions$1`\>(`key`, `options`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>; \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>; \}

###### Call Signature

> \<`TKey$1`, `TOptions$1`\>(`key`, `options`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

Creates a variant schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* `string`

###### TOptions$1

`TOptions$1` *extends* [`VariantOptions`](../type-aliases/VariantOptions.md)\<`TKey$1`\>

###### Parameters

###### key

`TKey$1`

The discriminator key.

###### options

`TOptions$1`

The variant options.

###### Returns

[`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `undefined`\>

A variant schema.

###### Call Signature

> \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): [`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

Creates a variant schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* `string`

###### TOptions$1

`TOptions$1` *extends* [`VariantOptions`](../type-aliases/VariantOptions.md)\<`TKey$1`\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`VariantIssue`](VariantIssue.md)\> \| `undefined`

###### Parameters

###### key

`TKey$1`

The discriminator key.

###### options

`TOptions$1`

The variant options.

###### message

`TMessage`

The error message.

###### Returns

[`VariantSchema`](VariantSchema.md)\<`TKey$1`, `TOptions$1`, `TMessage`\>

An variant schema.

***

##### Function

\{\<`TKey$1`, `TOptions$1`\>(`key`, `options`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `undefined`\>; \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `TMessage`\>; \}

###### Call Signature

> \<`TKey$1`, `TOptions$1`\>(`key`, `options`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `undefined`\>

Creates a variant schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* `string`

###### TOptions$1

`TOptions$1` *extends* [`VariantOptionsAsync`](../type-aliases/VariantOptionsAsync.md)\<`TKey$1`\>

###### Parameters

###### key

`TKey$1`

The discriminator key.

###### options

`TOptions$1`

The variant options.

###### Returns

`VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `undefined`\>

A variant schema.

###### Call Signature

> \<`TKey$1`, `TOptions$1`, `TMessage`\>(`key`, `options`, `message`): `VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `TMessage`\>

Creates a variant schema.

###### Type Parameters

###### TKey$1

`TKey$1` *extends* `string`

###### TOptions$1

`TOptions$1` *extends* [`VariantOptionsAsync`](../type-aliases/VariantOptionsAsync.md)\<`TKey$1`\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`VariantIssue`](VariantIssue.md)\> \| `undefined`

###### Parameters

###### key

`TKey$1`

The discriminator key.

###### options

`TOptions$1`

The variant options.

###### message

`TMessage`

The error message.

###### Returns

`VariantSchemaAsync`\<`TKey$1`, `TOptions$1`, `TMessage`\>

An variant schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"variant"`

Defined in: node\_modules/valibot/dist/index.d.mts:7565

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
