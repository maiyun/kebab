[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / SchemaWithPipe

# Type Alias: SchemaWithPipe\<TPipe$1\>

> **SchemaWithPipe**\<`TPipe$1`\> = `Omit`\<`FirstTupleItem`\<`TPipe$1`\>, `"pipe"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object`

Defined in: node\_modules/valibot/dist/index.d.mts:504

Schema with pipe type.

## Type Declaration

### ~run

> `readonly` **~run**: (`dataset`, `config`) => [`OutputDataset`](OutputDataset.md)\<[`InferOutput`](InferOutput.md)\<`LastTupleItem`\<`TPipe$1`\>\>, [`InferIssue`](InferIssue.md)\<`TPipe$1`\[`number`\]\>\>

**`Internal`**

Parses unknown input values.

#### Parameters

##### dataset

[`UnknownDataset`](../interfaces/UnknownDataset.md)

The input dataset.

##### config

[`Config`](../interfaces/Config.md)\<[`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

The configuration.

#### Returns

[`OutputDataset`](OutputDataset.md)\<[`InferOutput`](InferOutput.md)\<`LastTupleItem`\<`TPipe$1`\>\>, [`InferIssue`](InferIssue.md)\<`TPipe$1`\[`number`\]\>\>

The output dataset.

### ~standard

> `readonly` **~standard**: [`StandardProps`](../interfaces/StandardProps.md)\<[`InferInput`](InferInput.md)\<`FirstTupleItem`\<`TPipe$1`\>\>, [`InferOutput`](InferOutput.md)\<`LastTupleItem`\<`TPipe$1`\>\>\>

**`Internal`**

The Standard Schema properties.

### ~types?

> `readonly` `optional` **~types?**: `object`

**`Internal`**

The input, output and issue type.

#### ~types.input

> `readonly` **input**: [`InferInput`](InferInput.md)\<`FirstTupleItem`\<`TPipe$1`\>\>

#### ~types.issue

> `readonly` **issue**: [`InferIssue`](InferIssue.md)\<`TPipe$1`\[`number`\]\>

#### ~types.output

> `readonly` **output**: [`InferOutput`](InferOutput.md)\<`LastTupleItem`\<`TPipe$1`\>\>

### pipe

> `readonly` **pipe**: `TPipe$1`

The pipe items.

## Type Parameters

### TPipe$1

`TPipe$1` *extends* readonly \[[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `...PipeItem<any, unknown, BaseIssue<unknown>>[]`\]
