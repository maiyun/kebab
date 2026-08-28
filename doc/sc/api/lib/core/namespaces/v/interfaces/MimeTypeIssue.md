[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MimeTypeIssue

# Interface: MimeTypeIssue\<TInput$1, TRequirement\>

Defined in: node\_modules/valibot/dist/index.d.mts:11929

MIME type issue interface.

## Extends

- [`BaseIssue`](BaseIssue.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* `Blob`

### TRequirement

`TRequirement` *extends* `Requirement`

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

> `readonly` **expected**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:11941

The expected input.

#### Overrides

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

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:11933

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

> `readonly` **received**: `` `"${string}"` ``

Defined in: node\_modules/valibot/dist/index.d.mts:11945

The received input.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`received`](BaseIssue.md#received)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:11949

The MIME types.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`requirement`](BaseIssue.md#requirement)

***

### type

> `readonly` **type**: `"mime_type"`

Defined in: node\_modules/valibot/dist/index.d.mts:11937

The issue type.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`type`](BaseIssue.md#type)
