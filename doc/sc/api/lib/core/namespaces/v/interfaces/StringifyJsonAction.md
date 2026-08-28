[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / StringifyJsonAction

# Interface: StringifyJsonAction\<TInput$1, TConfig, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:14584

**`Beta`**

Stringify JSON action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `string`, [`StringifyJsonIssue`](StringifyJsonIssue.md)\<`TInput$1`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TConfig

`TConfig` *extends* [`StringifyJsonConfig`](StringifyJsonConfig.md) \| `undefined`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StringifyJsonIssue`](StringifyJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`StringifyJsonIssue`](StringifyJsonIssue.md)\<`TInput$1`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`StringifyJsonIssue`](StringifyJsonIssue.md)\<`TInput$1`\>\>

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

> `readonly` **issue**: [`StringifyJsonIssue`](StringifyJsonIssue.md)

#### output

> `readonly` **output**: `string`

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

Defined in: node\_modules/valibot/dist/index.d.mts:14596

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

Defined in: node\_modules/valibot/dist/index.d.mts:14600

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`\>(): `StringifyJsonAction`\<`TInput$1`, `undefined`, `undefined`\>; \<`TInput$1`, `TConfig`\>(`config`): `StringifyJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>; \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `StringifyJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:14592

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`\>(): `StringifyJsonAction`\<`TInput$1`, `undefined`, `undefined`\>

**`Beta`**

Creates a stringify JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

##### Returns

`StringifyJsonAction`\<`TInput$1`, `undefined`, `undefined`\>

A stringify JSON action.

#### Call Signature

> \<`TInput$1`, `TConfig`\>(`config`): `StringifyJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>

**`Beta`**

Creates a stringify JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TConfig

`TConfig` *extends* [`StringifyJsonConfig`](StringifyJsonConfig.md) \| `undefined`

##### Parameters

###### config

`TConfig`

The action config.

##### Returns

`StringifyJsonAction`\<`TInput$1`, `TConfig`, `undefined`\>

A stringify JSON action.

#### Call Signature

> \<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): `StringifyJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>

**`Beta`**

Creates a stringify JSON transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TConfig

`TConfig` *extends* [`StringifyJsonConfig`](StringifyJsonConfig.md) \| `undefined`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StringifyJsonIssue`](StringifyJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

##### Parameters

###### config

`TConfig`

The action config.

###### message

`TMessage`

The error message.

##### Returns

`StringifyJsonAction`\<`TInput$1`, `TConfig`, `TMessage`\>

A stringify JSON action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"stringify_json"`

Defined in: node\_modules/valibot/dist/index.d.mts:14588

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
