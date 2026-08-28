[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / IValibotXsrfIssue

# Interface: IValibotXsrfIssue

Defined in: [sys/ctr.ts:63](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L63)

XSRF 校验失败的问题描述

## Extends

- [`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\>

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3717

Whether it should be aborted early.

#### Inherited from

[`Config`](../../../lib/core/namespaces/v/interfaces/Config.md).[`abortEarly`](../../../lib/core/namespaces/v/interfaces/Config.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3721

Whether a pipe should be aborted early.

#### Inherited from

[`Config`](../../../lib/core/namespaces/v/interfaces/Config.md).[`abortPipeEarly`](../../../lib/core/namespaces/v/interfaces/Config.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `string` \| `null`

Defined in: node\_modules/valibot/dist/index.d.mts:3654

The expected property.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`expected`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#expected)

***

### input

> `readonly` **input**: `unknown`

Defined in: node\_modules/valibot/dist/index.d.mts:3650

The raw input data.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`input`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#input)

***

### issues?

> `readonly` `optional` **issues?**: \[[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\>, `...BaseIssue<unknown>[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3674

The sub issues.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`issues`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#issues)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: [sys/ctr.ts:64](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L64)

The issue kind.

#### Overrides

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`kind`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#kind)

***

### lang?

> `readonly` `optional` **lang?**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3709

The selected language.

#### Inherited from

[`Config`](../../../lib/core/namespaces/v/interfaces/Config.md).[`lang`](../../../lib/core/namespaces/v/interfaces/Config.md#lang)

***

### message

> `readonly` **message**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3662

The error message.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`message`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#message)

***

### path?

> `readonly` `optional` **path?**: \[[`IssuePathItem`](../../../lib/core/namespaces/v/type-aliases/IssuePathItem.md), `...IssuePathItem[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3670

The issue path.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`path`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#path)

***

### received

> `readonly` **received**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3658

The received property.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`received`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#received)

***

### requirement?

> `readonly` `optional` **requirement?**: `unknown`

Defined in: node\_modules/valibot/dist/index.d.mts:3666

The input requirement.

#### Inherited from

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`requirement`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#requirement)

***

### type

> `readonly` **type**: `"xsrf"`

Defined in: [sys/ctr.ts:65](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L65)

The issue type.

#### Overrides

[`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md).[`type`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md#type)
