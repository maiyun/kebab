[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / PicklistSchema

# Interface: PicklistSchema\<TOptions$1, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:6407

Picklist schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`TOptions$1`\[`number`\], `TOptions$1`\[`number`\], [`PicklistIssue`](PicklistIssue.md)\>

## Type Parameters

### TOptions$1

`TOptions$1` *extends* [`PicklistOptions`](../type-aliases/PicklistOptions.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PicklistIssue`](PicklistIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOptions$1`\[`number`\], [`PicklistIssue`](PicklistIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOptions$1`\[`number`\], [`PicklistIssue`](PicklistIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`TOptions$1`\[`number`\], `TOptions$1`\[`number`\]\>

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

> `readonly` **input**: `TOptions$1`\[`number`\]

#### issue

> `readonly` **issue**: [`PicklistIssue`](PicklistIssue.md)

#### output

> `readonly` **output**: `TOptions$1`\[`number`\]

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

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:6423

The error message.

***

### options

> `readonly` **options**: `TOptions$1`

Defined in: node\_modules/valibot/dist/index.d.mts:6419

The picklist options.

***

### reference

> `readonly` **reference**: \{\<`TOptions$1`\>(`options`): `PicklistSchema`\<`TOptions$1`, `undefined`\>; \<`TOptions$1`, `TMessage`\>(`options`, `message`): `PicklistSchema`\<`TOptions$1`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:6415

The schema reference.

#### Call Signature

> \<`TOptions$1`\>(`options`): `PicklistSchema`\<`TOptions$1`, `undefined`\>

Creates a picklist schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`PicklistOptions`](../type-aliases/PicklistOptions.md)

##### Parameters

###### options

`TOptions$1`

The picklist options.

##### Returns

`PicklistSchema`\<`TOptions$1`, `undefined`\>

A picklist schema.

#### Call Signature

> \<`TOptions$1`, `TMessage`\>(`options`, `message`): `PicklistSchema`\<`TOptions$1`, `TMessage`\>

Creates a picklist schema.

##### Type Parameters

###### TOptions$1

`TOptions$1` *extends* [`PicklistOptions`](../type-aliases/PicklistOptions.md)

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PicklistIssue`](PicklistIssue.md)\> \| `undefined`

##### Parameters

###### options

`TOptions$1`

The picklist options.

###### message

`TMessage`

The error message.

##### Returns

`PicklistSchema`\<`TOptions$1`, `TMessage`\>

A picklist schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"picklist"`

Defined in: node\_modules/valibot/dist/index.d.mts:6411

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
