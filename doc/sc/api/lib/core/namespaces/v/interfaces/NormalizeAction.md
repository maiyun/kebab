[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / NormalizeAction

# Interface: NormalizeAction\<TForm\>

Defined in: node\_modules/valibot/dist/index.d.mts:12994

Normalize action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`string`, `string`, `never`\>

## Type Parameters

### TForm

`TForm` *extends* [`NormalizeForm`](../type-aliases/NormalizeForm.md) \| `undefined`

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3178

**`Internal`**

Transforms known input values.

#### Parameters

##### dataset

[`SuccessDataset`](SuccessDataset.md)\<`string`\>

The input dataset.

##### config

[`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`string`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

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

> `readonly` **input**: `string`

#### issue

> `readonly` **issue**: `never`

#### output

> `readonly` **output**: `string`

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`~types`](BaseTransformation.md#types)

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3167

Whether it's async.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`async`](BaseTransformation.md#async)

***

### form

> `readonly` **form**: `TForm`

Defined in: node\_modules/valibot/dist/index.d.mts:13006

The normalization form.

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### reference

> `readonly` **reference**: \{(): `NormalizeAction`\<`undefined`\>; \<`TForm`\>(`form`): `NormalizeAction`\<`TForm`\>; \}

Defined in: node\_modules/valibot/dist/index.d.mts:13002

The action reference.

#### Call Signature

> (): `NormalizeAction`\<`undefined`\>

Creates a normalize transformation action.

##### Returns

`NormalizeAction`\<`undefined`\>

A normalize action.

#### Call Signature

> \<`TForm`\>(`form`): `NormalizeAction`\<`TForm`\>

Creates a normalize transformation action.

##### Type Parameters

###### TForm

`TForm` *extends* [`NormalizeForm`](../type-aliases/NormalizeForm.md) \| `undefined`

##### Parameters

###### form

`TForm`

The normalization form.

##### Returns

`NormalizeAction`\<`TForm`\>

A normalize action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"normalize"`

Defined in: node\_modules/valibot/dist/index.d.mts:12998

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
