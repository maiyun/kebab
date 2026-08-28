[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / CustomSchemaAsync

# Interface: CustomSchemaAsync\<TInput$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4137

Custom schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`TInput$1`, `TInput$1`, [`CustomIssue`](CustomIssue.md)\>

## Type Parameters

### TInput$1

`TInput$1`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => `Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`CustomIssue`](CustomIssue.md)\>\>

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

`Promise`\<[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`CustomIssue`](CustomIssue.md)\>\>

The output dataset.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`~run`](BaseSchemaAsync.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TInput$1`, `TInput$1`\>

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

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`CustomIssue`](CustomIssue.md)

#### output

> `readonly` **output**: `TInput$1`

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

### check

> `readonly` **check**: `CheckAsync`

Defined in: node\_modules/valibot/dist/index.d.mts:4153

The type check function.

***

### expects

> `readonly` **expects**: `"unknown"`

Defined in: node\_modules/valibot/dist/index.d.mts:4149

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

Defined in: node\_modules/valibot/dist/index.d.mts:4157

The error message.

***

### reference

> `readonly` **reference**: (\{\<`TInput$1`\>(`check`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`check`, `message`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `TMessage`\>; \}) \| (\{\<`TInput$1`\>(`check`): `CustomSchemaAsync`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`check`, `message`): `CustomSchemaAsync`\<`TInput$1`, `TMessage`\>; \})

Defined in: node\_modules/valibot/dist/index.d.mts:4145

The schema reference.

#### Union Members

##### Function

\{\<`TInput$1`\>(`check`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`check`, `message`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `TMessage`\>; \}

###### Call Signature

> \<`TInput$1`\>(`check`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `undefined`\>

Creates a custom schema.

###### Type Parameters

###### TInput$1

`TInput$1`

###### Parameters

###### check

`Check`

The type check function.

###### Returns

[`CustomSchema`](CustomSchema.md)\<`TInput$1`, `undefined`\>

A custom schema.

###### Call Signature

> \<`TInput$1`, `TMessage`\>(`check`, `message`): [`CustomSchema`](CustomSchema.md)\<`TInput$1`, `TMessage`\>

Creates a custom schema.

###### Type Parameters

###### TInput$1

`TInput$1`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined` = [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined`

###### Parameters

###### check

`Check`

The type check function.

###### message

`TMessage`

The error message.

###### Returns

[`CustomSchema`](CustomSchema.md)\<`TInput$1`, `TMessage`\>

A custom schema.

***

##### Function

\{\<`TInput$1`\>(`check`): `CustomSchemaAsync`\<`TInput$1`, `undefined`\>; \<`TInput$1`, `TMessage`\>(`check`, `message`): `CustomSchemaAsync`\<`TInput$1`, `TMessage`\>; \}

###### Call Signature

> \<`TInput$1`\>(`check`): `CustomSchemaAsync`\<`TInput$1`, `undefined`\>

Creates a custom schema.

###### Type Parameters

###### TInput$1

`TInput$1`

###### Parameters

###### check

`CheckAsync`

The type check function.

###### Returns

`CustomSchemaAsync`\<`TInput$1`, `undefined`\>

A custom schema.

###### Call Signature

> \<`TInput$1`, `TMessage`\>(`check`, `message`): `CustomSchemaAsync`\<`TInput$1`, `TMessage`\>

Creates a custom schema.

###### Type Parameters

###### TInput$1

`TInput$1`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined` = [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`CustomIssue`](CustomIssue.md)\> \| `undefined`

###### Parameters

###### check

`CheckAsync`

The type check function.

###### message

`TMessage`

The error message.

###### Returns

`CustomSchemaAsync`\<`TInput$1`, `TMessage`\>

A custom schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"custom"`

Defined in: node\_modules/valibot/dist/index.d.mts:4141

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
