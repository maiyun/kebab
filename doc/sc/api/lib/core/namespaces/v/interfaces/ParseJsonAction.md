[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ParseJsonAction

# Interface: ParseJsonAction\<TInput$1, TConfig, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:13848

**`Beta`**

Parse JSON action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `unknown`, [`ParseJsonIssue`](ParseJsonIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `string`

### TConfig

`TConfig` *extends* [`ParseJsonConfig`](ParseJsonConfig.md) \| `undefined`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseJsonIssue`](ParseJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ParseJsonIssue`](ParseJsonIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`ParseJsonIssue`](ParseJsonIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`ParseJsonIssue`](ParseJsonIssue.md)

#### output

> `readonly` **output**: `unknown`

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

Defined in: node\_modules/valibot/dist/index.d.mts:13860

**`Beta`**

The action config.

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

Defined in: node\_modules/valibot/dist/index.d.mts:13864

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `ParseJsonAction`\<`TInput$1`, `undefined`, `undefined`\>; \<`TInput$1`, `TConfig`\>(`config`): `ParseJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>; \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `ParseJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:13856

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `ParseJsonAction`\<`TInput$1`, `undefined`, `undefined`\>

**`Beta`**

Creates a parse JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

##### Returns

`ParseJsonAction`\<`TInput$1`, `undefined`, `undefined`\>

A parse JSON action.

#### Call Signature

> \<`TInput$1`, `TConfig`\>(`config`): `ParseJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>

**`Beta`**

Creates a parse JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TConfig

`TConfig` *extends* [`ParseJsonConfig`](ParseJsonConfig.md) \| `undefined`

##### Parameters

###### config

`TConfig`

The action config.

##### Returns

`ParseJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>

A parse JSON action.

#### Call Signature

> \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `ParseJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>

**`Beta`**

Creates a parse JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* `string`

###### TConfig

`TConfig` *extends* [`ParseJsonConfig`](ParseJsonConfig.md) \| `undefined`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseJsonIssue`](ParseJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### config

`TConfig`

The action config.

###### message

`TMessage`

The error message.

##### Returns

`ParseJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>

A parse JSON action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"parse_json"`

Defined in: node\_modules/valibot/dist/index.d.mts:13852

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
