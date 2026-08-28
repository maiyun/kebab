[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SymbolIssue

# Interface: SymbolIssue

Defined in: node\_modules/valibot/dist/index.d.mts:7038

Symbol issue interface.

## Extends

- [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3717

Whether it should be aborted early.

#### Inherited from

[`Config`](Config.md).[`abortEarly`](Config.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3721

Whether a pipe should be aborted early.

#### Inherited from

[`Config`](Config.md).[`abortPipeEarly`](Config.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `"symbol"`

Defined in: node\_modules/valibot/dist/index.d.mts:7050

The expected property.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`expected`](BaseIssue.md#expected)

***

### input

> `readonly` **input**: `unknown`

Defined in: node\_modules/valibot/dist/index.d.mts:3650

The raw input data.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`input`](BaseIssue.md#input)

***

### issues?

> `readonly` `optional` **issues?**: \[[`BaseIssue`](BaseIssue.md)\<`unknown`\>, `...BaseIssue<unknown>[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3674

The sub issues.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`issues`](BaseIssue.md#issues)

***

### kind

> `readonly` **kind**: `"schema"`

Defined in: node\_modules/valibot/dist/index.d.mts:7042

The issue kind.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`kind`](BaseIssue.md#kind)

***

### lang?

> `readonly` `optional` **lang?**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3709

The selected language.

#### Inherited from

[`Config`](Config.md).[`lang`](Config.md#lang)

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

> `readonly` **type**: `"symbol"`

Defined in: node\_modules/valibot/dist/index.d.mts:7046

The issue type.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`type`](BaseIssue.md#type)
