[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getExamples

# Function: getExamples()

> **getExamples**\<`TSchema`\>(`schema`): [`InferExamples`](../type-aliases/InferExamples.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:448

**`Beta`**

Returns the examples of a schema.

If multiple examples are defined, it concatenates them using depth-first
search. If no examples are defined, an empty array is returned.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$13`

## Parameters

### schema

`TSchema`

The schema to get the examples from.

## Returns

[`InferExamples`](../type-aliases/InferExamples.md)\<`TSchema`\>

The examples, if any.
