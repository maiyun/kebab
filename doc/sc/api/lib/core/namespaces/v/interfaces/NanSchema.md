[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NanSchema

# Interface: NanSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:5171

NaN schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`number`, `number`, [`NanIssue`](NanIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NanIssue`](NanIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`number`, [`NanIssue`](NanIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`number`, [`NanIssue`](NanIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`number`, `number`\>

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

> `readonly` **input**: `number`

#### issue

> `readonly` **issue**: [`NanIssue`](NanIssue.md)

#### output

> `readonly` **output**: `number`

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

> `readonly` **expects**: `"NaN"`

Defined in: node\_modules/valibot/dist/index.d.mts:5183

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

Defined in: node\_modules/valibot/dist/index.d.mts:5187

The error message.

***

### reference

> `readonly` **reference**: \{(): `NanSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `NanSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:5179

The schema reference.

#### Call Signature

> (): `NanSchema`\<`undefined`\>

Creates a NaN schema.

##### Returns

`NanSchema`\<`undefined`\>

A NaN schema.

#### Call Signature

> \<`TMessage`\>(`message`): `NanSchema`\<`TMessage`\>

Creates a NaN schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NanIssue`](NanIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`NanSchema`\<`TMessage`\>

A NaN schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"nan"`

Defined in: node\_modules/valibot/dist/index.d.mts:5175

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
