[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / FunctionSchema

# Interface: FunctionSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:4465

Function schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<(...`args`) => `unknown`, (...`args`) => `unknown`, [`FunctionIssue`](FunctionIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`FunctionIssue`](FunctionIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `unknown`, [`FunctionIssue`](FunctionIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<(...`args`) => `unknown`, [`FunctionIssue`](FunctionIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<(...`args`) => `unknown`, (...`args`) => `unknown`\>

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

> `readonly` **input**: (...`args`) => `unknown`

##### Parameters

###### args

...`unknown`[]

##### Returns

`unknown`

#### issue

> `readonly` **issue**: [`FunctionIssue`](FunctionIssue.md)

#### output

> `readonly` **output**: (...`args`) => `unknown`

##### Parameters

###### args

...`unknown`[]

##### Returns

`unknown`

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

> `readonly` **expects**: `"Function"`

Defined in: node\_modules/valibot/dist/index.d.mts:4477

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

Defined in: node\_modules/valibot/dist/index.d.mts:4481

The error message.

***

### reference

> `readonly` **reference**: \{(): `FunctionSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `FunctionSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:4473

The schema reference.

#### Call Signature

> (): `FunctionSchema`\<`undefined`\>

Creates a function schema.

##### Returns

`FunctionSchema`\<`undefined`\>

A function schema.

#### Call Signature

> \<`TMessage`\>(`message`): `FunctionSchema`\<`TMessage`\>

Creates a function schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`FunctionIssue`](FunctionIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`FunctionSchema`\<`TMessage`\>

A function schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"function"`

Defined in: node\_modules/valibot/dist/index.d.mts:4469

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
