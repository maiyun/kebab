[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/ctr](../index.md) / TValibotResult

# Type Alias: TValibotResult\<TSchema, TIssue\>

> **TValibotResult**\<`TSchema`, `TIssue`\> = \{ `issues`: `undefined`; `output`: [`InferOutput`](../../../lib/core/namespaces/v/type-aliases/InferOutput.md)\<`TSchema`\>; `response`: `undefined`; `success`: `true`; `typed`: `true`; \} \| \{ `issues`: \[`TIssue`, `...TIssue[]`\]; `output`: `undefined`; `response`: [`Json`](../../../index/type-aliases/Json.md)[]; `success`: `false`; `typed`: `boolean`; \}

Defined in: [sys/ctr.ts:81](https://github.com/maiyunnet/kebab/blob/master/sys/ctr.ts#L81)

Valibot 校验结果：仅成功分支提供 schema 推导后的 output

## Type Parameters

### TSchema

`TSchema` *extends* [`GenericSchema`](../../../lib/core/namespaces/v/type-aliases/GenericSchema.md)

### TIssue

`TIssue` *extends* [`BaseIssue`](../../../lib/core/namespaces/v/interfaces/BaseIssue.md)\<`unknown`\> = [`InferIssue`](../../../lib/core/namespaces/v/type-aliases/InferIssue.md)\<`TSchema`\>
