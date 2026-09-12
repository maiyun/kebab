[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / MinEntriesIssue

# Interface: MinEntriesIssue\<TInput$1, TRequirement\>

Defined in: node\_modules/valibot/dist/index.d.mts:12342

**`Beta`**

Min entries issue interface.

## Extends

- [`BaseIssue`](BaseIssue.md)\<`TInput$1`\>

## Type Parameters

### TInput$1

`TInput$1` *extends* [`EntriesInput`](../type-aliases/EntriesInput.md)

### TRequirement

`TRequirement` *extends* `number`

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3717

**`Beta`**

Whether it should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortEarly`](BaseIssue.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly?**: `boolean`

Defined in: node\_modules/valibot/dist/index.d.mts:3721

**`Beta`**

Whether a pipe should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortPipeEarly`](BaseIssue.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `` `>=${TRequirement}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:12354

**`Beta`**

The expected property.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`expected`](BaseIssue.md#expected)

***

### input

> `readonly` **input**: `TInput$1`

Defined in: node\_modules/valibot/dist/index.d.mts:3650

**`Beta`**

The raw input data.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`input`](BaseIssue.md#input)

***

### issues?

> `readonly` `optional` **issues?**: \[[`BaseIssue`](BaseIssue.md)\<`TInput$1`\>, `...BaseIssue<TInput$1>[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3674

**`Beta`**

The sub issues.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`issues`](BaseIssue.md#issues)

***

### kind

> `readonly` **kind**: `"validation"`

Defined in: node\_modules/valibot/dist/index.d.mts:12346

**`Beta`**

The issue kind.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`kind`](BaseIssue.md#kind)

***

### lang?

> `readonly` `optional` **lang?**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3709

**`Beta`**

The selected language.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`lang`](BaseIssue.md#lang)

***

### message

> `readonly` **message**: `string`

Defined in: node\_modules/valibot/dist/index.d.mts:3662

**`Beta`**

The error message.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`message`](BaseIssue.md#message)

***

### path?

> `readonly` `optional` **path?**: \[[`IssuePathItem`](../type-aliases/IssuePathItem.md), `...IssuePathItem[]`\]

Defined in: node\_modules/valibot/dist/index.d.mts:3670

**`Beta`**

The issue path.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`path`](BaseIssue.md#path)

***

### received

> `readonly` **received**: `` `${number}` ``

Defined in: node\_modules/valibot/dist/index.d.mts:12358

**`Beta`**

The received property.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`received`](BaseIssue.md#received)

***

### requirement

> `readonly` **requirement**: `TRequirement`

Defined in: node\_modules/valibot/dist/index.d.mts:12362

**`Beta`**

The minimum entries.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`requirement`](BaseIssue.md#requirement)

***

### type

> `readonly` **type**: `"min_entries"`

Defined in: node\_modules/valibot/dist/index.d.mts:12350

**`Beta`**

The issue type.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`type`](BaseIssue.md#type)
