[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SafeParseResult

# Type Alias: SafeParseResult\<TSchema\>

> **SafeParseResult**\<`TSchema`\> = \{ `issues`: `undefined`; `output`: [`InferOutput`](InferOutput.md)\<`TSchema`\>; `success`: `true`; `typed`: `true`; \} \| \{ `issues`: \[[`InferIssue`](InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]; `output`: [`InferOutput`](InferOutput.md)\<`TSchema`\>; `success`: `false`; `typed`: `true`; \} \| \{ `issues`: \[[`InferIssue`](InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]; `output`: `unknown`; `success`: `false`; `typed`: `false`; \}

Defined in: node\_modules/valibot/dist/index.d.mts:2723

Safe parse result type.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

## Union Members

### Type Literal

\{ `issues`: `undefined`; `output`: [`InferOutput`](InferOutput.md)\<`TSchema`\>; `success`: `true`; `typed`: `true`; \}

#### issues

> `readonly` **issues**: `undefined`

The issues, if any.

#### output

> `readonly` **output**: [`InferOutput`](InferOutput.md)\<`TSchema`\>

The output value.

#### success

> `readonly` **success**: `true`

Whether it's successful.

#### typed

> `readonly` **typed**: `true`

Whether is's typed.

***

### Type Literal

\{ `issues`: \[[`InferIssue`](InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]; `output`: [`InferOutput`](InferOutput.md)\<`TSchema`\>; `success`: `false`; `typed`: `true`; \}

***

### Type Literal

\{ `issues`: \[[`InferIssue`](InferIssue.md)\<`TSchema`\>, `...InferIssue<TSchema>[]`\]; `output`: `unknown`; `success`: `false`; `typed`: `false`; \}
