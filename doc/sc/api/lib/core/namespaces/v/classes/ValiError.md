[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ValiError

# Class: ValiError\<TSchema\>

Defined in: node\_modules/valibot/dist/index.d.mts:16556

A Valibot error with useful information.

## Extends

- `Error`

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Constructors

### Constructor

> **new ValiError**\<`TSchema`\>(`issues`): `ValiError`\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:16566

Creates a Valibot error with useful information.

#### Parameters

##### issues

\[[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]

The error issues.

#### Returns

`ValiError`\<`TSchema`\>

#### Overrides

`Error.constructor`

## Properties

### issues

> `readonly` **issues**: \[[`InferIssue`](../type-aliases/InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:16560

The error issues.
