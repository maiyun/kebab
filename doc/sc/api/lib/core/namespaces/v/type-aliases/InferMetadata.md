[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / InferMetadata

# Type Alias: InferMetadata\<TSchema\>

> **InferMetadata**\<`TSchema`\> = [`BaseSchema`](../interfaces/BaseSchema.md)\<`any`, `any`, `any`\> *extends* `TSchema` ? `Record`\<`string`, `unknown`\> : [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`any`, `any`, `any`\> *extends* `TSchema` ? `Record`\<`string`, `unknown`\> : `TSchema` *extends* [`SchemaWithPipe`](SchemaWithPipe.md)\<infer TPipe\> \| [`SchemaWithPipeAsync`](SchemaWithPipeAsync.md)\<infer TPipe\> ? `Prettify`\<`RecursiveMerge$1`\<`TPipe`\>\> : `object`

Defined in: node\_modules/valibot/dist/index.d.mts:1324

**`Beta`**

Infer metadata type.

## Type Parameters

### TSchema

`TSchema` *extends* `Schema$12`
