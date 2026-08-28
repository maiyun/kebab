[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SymbolSchema

# Interface: SymbolSchema\<TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:7055

Symbol schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`symbol`, `symbol`, [`SymbolIssue`](SymbolIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SymbolIssue`](SymbolIssue.md)\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`symbol`, [`SymbolIssue`](SymbolIssue.md)\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`symbol`, [`SymbolIssue`](SymbolIssue.md)\>

The output dataset.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`~run`](BaseSchema.md#run)

***

### ~standard

> `readonly` **~standard**: [`StandardProps`](StandardProps.md)\<`symbol`, `symbol`\>

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

> `readonly` **input**: `symbol`

#### issue

> `readonly` **issue**: [`SymbolIssue`](SymbolIssue.md)

#### output

> `readonly` **output**: `symbol`

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

> `readonly` **expects**: `"symbol"`

Defined in: node\_modules/valibot/dist/index.d.mts:7067

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

Defined in: node\_modules/valibot/dist/index.d.mts:7071

The error message.

***

### reference

> `readonly` **reference**: \{(): `SymbolSchema`\<`undefined`\>; \<`TMessage`\>(`message`): `SymbolSchema`\<`TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:7063

The schema reference.

#### Call Signature

> (): `SymbolSchema`\<`undefined`\>

Creates a symbol schema.

##### Returns

`SymbolSchema`\<`undefined`\>

A symbol schema.

#### Call Signature

> \<`TMessage`\>(`message`): `SymbolSchema`\<`TMessage`\>

Creates a symbol schema.

##### Type Parameters

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`SymbolIssue`](SymbolIssue.md)\> \| `undefined`

##### Parameters

###### message

`TMessage`

The error message.

##### Returns

`SymbolSchema`\<`TMessage`\>

A symbol schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"symbol"`

Defined in: node\_modules/valibot/dist/index.d.mts:7059

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
