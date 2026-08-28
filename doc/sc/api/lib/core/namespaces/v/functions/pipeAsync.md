[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / pipeAsync

# Function: pipeAsync()

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`\>(`schema`, `item1`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:962

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`\>(`schema`, `item1`, `item2`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:972

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`\>(`schema`, `item1`, `item2`, `item3`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:983

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`\>(`schema`, `item1`, `item2`, `item3`, `item4`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:995

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1008

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1022

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1037

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1053

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1070

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1088

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1107

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1127

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1148

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1170

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`, `item15`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1193

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem15

`TItem15` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

#### item15

`TItem15` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\>

The fifteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`, `item15`, `item16`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1217

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem15

`TItem15` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem16

`TItem16` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

#### item15

`TItem15` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\>

The fifteenth pipe item.

#### item16

`TItem16` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\>

The sixteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`, `item15`, `item16`, `item17`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1242

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem15

`TItem15` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem16

`TItem16` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem17

`TItem17` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

#### item15

`TItem15` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\>

The fifteenth pipe item.

#### item16

`TItem16` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\>

The sixteenth pipe item.

#### item17

`TItem17` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\>

The seventeenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`, `item15`, `item16`, `item17`, `item18`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1268

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem15

`TItem15` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem16

`TItem16` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem17

`TItem17` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem18

`TItem18` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

#### item15

`TItem15` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\>

The fifteenth pipe item.

#### item16

`TItem16` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\>

The sixteenth pipe item.

#### item17

`TItem17` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\>

The seventeenth pipe item.

#### item18

`TItem18` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem18`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem18`\>\>

The eighteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`, `TItem19`\>(`schema`, `item1`, `item2`, `item3`, `item4`, `item5`, `item6`, `item7`, `item8`, `item9`, `item10`, `item11`, `item12`, `item13`, `item14`, `item15`, `item16`, `item17`, `item18`, `item19`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`, `TItem19`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1295

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem1

`TItem1` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem2

`TItem2` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem3

`TItem3` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem4

`TItem4` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem5

`TItem5` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem6

`TItem6` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem7

`TItem7` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem8

`TItem8` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem9

`TItem9` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem10

`TItem10` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem11

`TItem11` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem12

`TItem12` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem13

`TItem13` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem14

`TItem14` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem15

`TItem15` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem16

`TItem16` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem17

`TItem17` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem18

`TItem18` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItem19

`TItem19` *extends* [`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### schema

`TSchema`

The root schema.

#### item1

`TItem1` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem1`\>\>

The first pipe item.

#### item2

`TItem2` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem1`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem2`\>\>

The second pipe item.

#### item3

`TItem3` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem2`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem3`\>\>

The third pipe item.

#### item4

`TItem4` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem3`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem4`\>\>

The fourth pipe item.

#### item5

`TItem5` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem4`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem5`\>\>

The fifth pipe item.

#### item6

`TItem6` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem5`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem6`\>\>

The sixth pipe item.

#### item7

`TItem7` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem6`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem7`\>\>

The seventh pipe item.

#### item8

`TItem8` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem7`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem8`\>\>

The eighth pipe item.

#### item9

`TItem9` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem8`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem9`\>\>

The ninth pipe item.

#### item10

`TItem10` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem9`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem10`\>\>

The tenth pipe item.

#### item11

`TItem11` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem10`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem11`\>\>

The eleventh pipe item.

#### item12

`TItem12` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem11`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem12`\>\>

The twelfth pipe item.

#### item13

`TItem13` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem12`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem13`\>\>

The thirteenth pipe item.

#### item14

`TItem14` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem13`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem14`\>\>

The fourteenth pipe item.

#### item15

`TItem15` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem14`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem15`\>\>

The fifteenth pipe item.

#### item16

`TItem16` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem15`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem16`\>\>

The sixteenth pipe item.

#### item17

`TItem17` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem16`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem17`\>\>

The seventeenth pipe item.

#### item18

`TItem18` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem18`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem17`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem18`\>\>

The eighteenth pipe item.

#### item19

`TItem19` \| [`PipeAction`](../type-aliases/PipeAction.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem19`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem19`\>\> \| [`PipeActionAsync`](../type-aliases/PipeActionAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TItem18`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem19`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem19`\>\>

The nineteenth pipe item.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItem1`, `TItem2`, `TItem3`, `TItem4`, `TItem5`, `TItem6`, `TItem7`, `TItem8`, `TItem9`, `TItem10`, `TItem11`, `TItem12`, `TItem13`, `TItem14`, `TItem15`, `TItem16`, `TItem17`, `TItem18`, `TItem19`\]\>

A schema with a pipeline.

## Call Signature

> **pipeAsync**\<`TSchema`, `TItems$1`\>(`schema`, ...`items`): [`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItems$1`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:1304

Adds a pipeline to a schema, that can validate and transform its input.

### Type Parameters

#### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TItems$1

`TItems$1` *extends* readonly ([`PipeItem`](../type-aliases/PipeItem.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`PipeItemAsync`](../type-aliases/PipeItemAsync.md)\<[`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TSchema`\>, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>)[]

### Parameters

#### schema

`TSchema`

The root schema.

#### items

...`TItems$1`

The pipe items.

### Returns

[`SchemaWithPipeAsync`](../type-aliases/SchemaWithPipeAsync.md)\<readonly \[`TSchema`, `TItems$1`\]\>

A schema with a pipeline.
