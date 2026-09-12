[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / RawTransformIssue

# Interface: RawTransformIssue\<TInput$1\>

Defined in: node\_modules/valibot/dist/index.d.mts:14167

Raw transform issue interface.

## Extends

- [`BaseIssue`](BaseIssue.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1`

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3717

Whether it should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortEarly`](BaseIssue.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3721

Whether a pipe should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortPipeEarly`](BaseIssue.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `string` \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:3654

The expected property.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`expected`](BaseIssue.md#expected)

***

### input

> `readonly` **input**: `TInput$1`

Defined in: node\_modules/valibot/dist/index.d.mts:3650

The raw input data.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`input`](BaseIssue.md#input)

***

### issues?

> `readonly` `optional` **issues?**: \[[`BaseIssue`](BaseIssue.md)\<`TInput$1`\>, `...BaseIssue<TInput$1>[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3674

The sub issues.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`issues`](BaseIssue.md#issues)

***

### kind

> `readonly` **kind**: `"transformation"`

Defined in: node\_modules/valibot/dist/index.d.mts:14171

The issue kind.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`kind`](BaseIssue.md#kind)

***

### lang?

> `readonly` `optional` **lang?**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3709

The selected language.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`lang`](BaseIssue.md#lang)

***

### message

> `readonly` **message**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3662

The error message.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`message`](BaseIssue.md#message)

***

### path?

> `readonly` `optional` **path?**: \[[`IssuePathItem`](../type-aliases/IssuePathItem.md), `...IssuePathItem[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3670

The issue path.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`path`](BaseIssue.md#path)

***

### received

> `readonly` **received**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3658

The received property.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`received`](BaseIssue.md#received)

***

### requirement?

> `readonly` `optional` **requirement?**: `unknown`

Defined in: node\_modules/valibot/dist/index.d.mts:3666

The input requirement.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`requirement`](BaseIssue.md#requirement)

***

### type

> `readonly` **type**: `"raw_transform"`

Defined in: node\_modules/valibot/dist/index.d.mts:14175

The issue type.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`type`](BaseIssue.md#type)
