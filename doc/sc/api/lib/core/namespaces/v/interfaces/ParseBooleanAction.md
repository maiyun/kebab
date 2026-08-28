[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ParseBooleanAction

# Interface: ParseBooleanAction\<TInput$1, TConfig, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:13414

**`Beta`**

Parse boolean action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `boolean`, [`ParseBooleanIssue`](ParseBooleanIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TConfig

`TConfig` *extends* [`ParseBooleanConfig`](ParseBooleanConfig.md) \| `undefined`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseBooleanIssue`](ParseBooleanIssue.md)\<`TInput$1`\>\> \| `undefined` = `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`boolean`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ParseBooleanIssue`](ParseBooleanIssue.md)\<`TInput$1`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3178

**`Internal`**

Transforms known input values.

#### Parameters

##### dataset

[`SuccessDataset`](SuccessDataset.md)\<`TInput$1`\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`boolean`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ParseBooleanIssue`](ParseBooleanIssue.md)\<`TInput$1`\>\>

The output dataset.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~run`](BaseTransformation.md#run)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3184

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`ParseBooleanIssue`](ParseBooleanIssue.md)

#### output

> `readonly` **output**: `boolean`

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~types`](BaseTransformation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3167

**`Beta`**

Whether it's async.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`async`](BaseTransformation.md#async)

***

### config

> `readonly` **config**: `TConfig`

Defined in: node\_modules/valibot/dist/index.d.mts:13430

**`Beta`**

The parse boolean config.

***

### expects

> `readonly` **expects**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:13426

**`Beta`**

The expected property.

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

**`Beta`**

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:13434

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `ParseBooleanAction`\<`TInput$1`, `undefined`, `undefined`\>; \<`TInput$1`, `TConfig`\>(`config`): `ParseBooleanAction`\<`TInput$1`, `TConfig`, `undefined`\>; \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `ParseBooleanAction`\<`TInput$1`, `TConfig`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:13422

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `ParseBooleanAction`\<`TInput$1`, `undefined`, `undefined`\>

**`Beta`**

Creates a parse boolean transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

##### Returns

`ParseBooleanAction`\<`TInput$1`, `undefined`, `undefined`\>

A parse boolean action.

#### Call Signature

> \<`TInput$1`, `TConfig`\>(`config`): `ParseBooleanAction`\<`TInput$1`, `TConfig`, `undefined`\>

**`Beta`**

Creates a parse boolean transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TConfig

`TConfig` *extends* [`ParseBooleanConfig`](ParseBooleanConfig.md) \| `undefined`

##### Parameters

###### config

`TConfig`

The parse boolean config.

##### Returns

`ParseBooleanAction`\<`TInput$1`, `TConfig`, `undefined`\>

A parse boolean action.

#### Call Signature

> \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `ParseBooleanAction`\<`TInput$1`, `TConfig`, `TMessage`\>

**`Beta`**

Creates a parse boolean transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TConfig

`TConfig` *extends* [`ParseBooleanConfig`](ParseBooleanConfig.md) \| `undefined`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseBooleanIssue`](ParseBooleanIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### config

`TConfig`

The parse boolean config.

###### message

`TMessage`

The error message.

##### Returns

`ParseBooleanAction`\<`TInput$1`, `TConfig`, `TMessage`\>

A parse boolean action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"parse_boolean"`

Defined in: node\_modules/valibot/dist/index.d.mts:13418

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
