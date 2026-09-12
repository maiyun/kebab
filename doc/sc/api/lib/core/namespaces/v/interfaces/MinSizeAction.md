[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MinSizeAction

# Interface: MinSizeAction\<TInput$1, TRequirement, TMessage\>

Defined in: node\_modules/valibot/dist/index.d.mts:12580

Min size action interface.

## Extends

- [`BaseValidation`](BaseValidation.md)\<`TInput$1`, `TInput$1`, [`MinSizeIssue`](MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

### TRequirement

`TRequirement` *extends* `number`

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinSizeIssue`](MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MinSizeIssue`](MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3258

**`Internal`**

Validates known input values.

#### Parameters

##### dataset

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TInput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| [`MinSizeIssue`](MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\>

The output dataset.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~run`](BaseValidation.md#run)

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3264

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: [`MinSizeIssue`](MinSizeIssue.md)

#### output

> `readonly` **output**: `TInput$1`

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`~types`](BaseValidation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3247

Whether it's async.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`async`](BaseValidation.md#async)

***

### expects

> `readonly` **expects**: `` `>=${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:12592

The expected property.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`expects`](BaseValidation.md#expects)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3231

The object kind.

#### Inherited from

[`BaseValidation`](BaseValidation.md).[`kind`](BaseValidation.md#kind)

***

### message

> `readonly` **message**: `TMessage`

Defined in: node\_modules/valibot/dist/index.d.mts:12600

The error message.

***

### reference

> `readonly` **reference**: \{\<`TInput$1`, `TRequirement`\>(`requirement`): `MinSizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>; \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MinSizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:12588

The action reference.

#### Call Signature

> \<`TInput$1`, `TRequirement`\>(`requirement`): `MinSizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>

Creates a min size validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

###### TRequirement

`TRequirement` *extends* `number`

##### Parameters

###### requirement

`TRequirement`

The minimum size.

##### Returns

`MinSizeAction`\<`TInput$1`, `TRequirement`, `undefined`\>

A min size action.

#### Call Signature

> \<`TInput$1`, `TRequirement`, `TMessage`\>(`requirement`, `message`): `MinSizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

Creates a min size validation action.

##### Type Parameters

###### TInput$1

`TInput$1` *extends* [`SizeInput`](../type-aliases/SizeInput.md)

###### TRequirement

`TRequirement` *extends* `number`

###### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MinSizeIssue`](MinSizeIssue.md)\<`TInput$1`, `TRequirement`\>\> \| `undefined`

##### Parameters

###### requirement

`TRequirement`

The minimum size.

###### message

`TMessage`

The error message.

##### Returns

`MinSizeAction`\<`TInput$1`, `TRequirement`, `TMessage`\>

A min size action.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`reference`](BaseValidation.md#reference)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:12596

The minimum size.

***

### type

> `readonly` **type**: `"min_size"`

Defined in: node\_modules/valibot/dist/index.d.mts:12584

The action type.

#### Overrides

[`BaseValidation`](BaseValidation.md).[`type`](BaseValidation.md#type)
