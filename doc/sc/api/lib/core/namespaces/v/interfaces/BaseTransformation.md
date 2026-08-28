[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / BaseTransformation

# Interface: BaseTransformation\<TInput$1, TOutput$1, TIssue\>

Defined in: node\_modules/valibot/dist/index.d.mts:3151

Base transformation interface.

## Extended by

- [`ArgsAction`](ArgsAction.md)
- [`ArgsActionAsync`](ArgsActionAsync.md)
- [`BrandAction`](BrandAction.md)
- [`FilterItemsAction`](FilterItemsAction.md)
- [`FindItemAction`](FindItemAction.md)
- [`FlavorAction`](FlavorAction.md)
- [`GuardAction`](GuardAction.md)
- [`MapItemsAction`](MapItemsAction.md)
- [`NormalizeAction`](NormalizeAction.md)
- [`ParseBooleanAction`](ParseBooleanAction.md)
- [`ParseJsonAction`](ParseJsonAction.md)
- [`RawTransformAction`](RawTransformAction.md)
- [`ReadonlyAction`](ReadonlyAction.md)
- [`ReduceItemsAction`](ReduceItemsAction.md)
- [`ReturnsAction`](ReturnsAction.md)
- [`ReturnsActionAsync`](ReturnsActionAsync.md)
- [`SortItemsAction`](SortItemsAction.md)
- [`StringifyJsonAction`](StringifyJsonAction.md)
- [`ToBigintAction`](ToBigintAction.md)
- [`ToBooleanAction`](ToBooleanAction.md)
- [`ToCamelCaseAction`](ToCamelCaseAction.md)
- [`ToDateAction`](ToDateAction.md)
- [`ToKebabCaseAction`](ToKebabCaseAction.md)
- [`ToLowerCaseAction`](ToLowerCaseAction.md)
- [`ToMaxValueAction`](ToMaxValueAction.md)
- [`ToMinValueAction`](ToMinValueAction.md)
- [`ToNumberAction`](ToNumberAction.md)
- [`ToPascalCaseAction`](ToPascalCaseAction.md)
- [`ToSnakeCaseAction`](ToSnakeCaseAction.md)
- [`ToStringAction`](ToStringAction.md)
- [`ToUpperCaseAction`](ToUpperCaseAction.md)
- [`TransformAction`](TransformAction.md)
- [`TrimAction`](TrimAction.md)
- [`TrimEndAction`](TrimEndAction.md)
- [`TrimStartAction`](TrimStartAction.md)

## Type Parameters

### TInput$1

`TInput$1`

### TOutput$1

`TOutput$1`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>

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

[`OutputDataset`](../type-aliases/OutputDataset.md)\<`TOutput$1`, [`BaseIssue`](BaseIssue.md)\<`unknown`\> \| `TIssue`\>

The output dataset.

***

### ~types?

> `readonly` `optional` **~types?**: `object`

Defined in: node\_modules/valibot/dist/index.d.mts:3184

**`Internal`**

The input, output and issue type.

#### input

> `readonly` **input**: `TInput$1`

#### issue

> `readonly` **issue**: `TIssue`

#### output

> `readonly` **output**: `TOutput$1`

***

### async

> `readonly` **async**: `false`

Defined in: node\_modules/valibot/dist/index.d.mts:3167

Whether it's async.

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:3155

The object kind.

***

### reference

> `readonly` **reference**: (...`args`) => `BaseTransformation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

Defined in: node\_modules/valibot/dist/index.d.mts:3163

The transformation reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseTransformation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3159

The transformation type.
