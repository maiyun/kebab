[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / GuardAction

# Interface: GuardAction\<TInput$1, TGuard, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:9624

**`Beta`**

Guard action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput$1`, `TInput$1` & [`InferGuardOutput`](../type-aliases/InferGuardOutput.md)\<`TGuard`\>, [`GuardIssue`](GuardIssue.md)\<`TInput$1`, `TGuard`\>\>

## Type Parameters

### TInput$1

`TInput$1`

### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`TInput$1`\>

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GuardIssue`](GuardIssue.md)\<`TInput$1`, `TGuard`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`InferGuardOutput`](../type-aliases/InferGuardOutput.md)\<`TGuard`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`GuardIssue`](GuardIssue.md)\<`TInput$1`, `TGuard`\>\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1` & [`InferGuardOutput`](../type-aliases/InferGuardOutput.md)\<`TGuard`\>, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`GuardIssue`](GuardIssue.md)\<`TInput$1`, `TGuard`\>\>

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

> `readonly` **issue**: [`GuardIssue`](GuardIssue.md)

#### output

> `readonly` **output**: `TInput$1` & [`InferGuardOutput`](../type-aliases/InferGuardOutput.md)\<`TGuard`\>

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

Defined in: node\_modules/valibot/dist/index.d.mts:9640

**`Beta`**

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TGuard`\>(`requirement`): `GuardAction`\<`TInput$1`, `TGuard`, `undefined`\>; \<`TGuard`\>(`requirement`): `GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `undefined`\>; \<`TInput$1`, `TGuard`, `TMessage`\>(`requirement`, `message`): `GuardAction`\<`TInput$1`, `TGuard`, `TMessage`\>; \<`TGuard`, `TMessage`\>(`requirement`, `message`): `GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:9632

**`Beta`**

The action reference.

#### Call Signature

> \<`TInput$1`, `TGuard`\>(`requirement`): `GuardAction`\<`TInput$1`, `TGuard`, `undefined`\>

**`Beta`**

Creates a guard transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`TInput$1`\>

##### Parameters

###### requirement

`TGuard`

The guard function.

##### Returns

`GuardAction`\<`TInput$1`, `TGuard`, `undefined`\>

A guard action.

#### Call Signature

> \<`TGuard`\>(`requirement`): `GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `undefined`\>

**`Beta`**

Creates a guard transformation action.

##### Type Parameters

###### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`any`\>

##### Parameters

###### requirement

`TGuard`

The guard function.

##### Returns

`GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `undefined`\>

A guard action.

#### Call Signature

> \<`TInput$1`, `TGuard`, `TMessage`\>(`requirement`, `message`): `GuardAction`\<`TInput$1`, `TGuard`, `TMessage`\>

**`Beta`**

Creates a guard transformation action.

##### Type Parameters

###### TInput$1

`TInput$1`

###### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`TInput$1`\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GuardIssue`](GuardIssue.md)\<`TInput$1`, `TGuard`\>\> \| `undefined`

##### Parameters

###### requirement

`TGuard`

The guard function.

###### message

`TMessage`

The error message.

##### Returns

`GuardAction`\<`TInput$1`, `TGuard`, `TMessage`\>

A guard action.

#### Call Signature

> \<`TGuard`, `TMessage`\>(`requirement`, `message`): `GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `TMessage`\>

**`Beta`**

Creates a guard transformation action.

##### Type Parameters

###### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`any`\>

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GuardIssue`](GuardIssue.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`\>\> \| `undefined`

##### Parameters

###### requirement

`TGuard`

The guard function.

###### message

`TMessage`

The error message.

##### Returns

`GuardAction`\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `TMessage`\>

A guard action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### requirement

> `readonly` **requirement**: `TGuard`

Defined in: node\_modules/valibot/dist/index.d.mts:9636

**`Beta`**

The guard function.

***

### type

> `readonly` **type**: `"guard"`

Defined in: node\_modules/valibot/dist/index.d.mts:9628

**`Beta`**

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
