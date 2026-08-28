[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / getFallbacks

# Function: getFallbacks()

> **getFallbacks**\<`TSchema`\>(`schema`): [`InferFallbacks`](../type-aliases/InferFallbacks.md)\<`TSchema`\>

Defined in: node\_modules/valibot/dist/index.d.mts:484

Returns the fallback values of the schema.

Hint: The difference to `getFallback` is that for object and tuple schemas
this function recursively returns the fallback values of the subschemas
instead of `undefined`.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> \| [`ObjectSchema`](../interfaces/ObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> \| [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> \| [`LooseTupleSchema`](../interfaces/LooseTupleSchema.md)\<[`TupleItems`](../type-aliases/TupleItems.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LooseTupleIssue`](../interfaces/LooseTupleIssue.md)\> \| `undefined`\> \| [`StrictTupleSchema`](../interfaces/StrictTupleSchema.md)\<[`TupleItems`](../type-aliases/TupleItems.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StrictTupleIssue`](../interfaces/StrictTupleIssue.md)\> \| `undefined`\> \| [`TupleSchema`](../interfaces/TupleSchema.md)\<[`TupleItems`](../type-aliases/TupleItems.md), [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleIssue`](../interfaces/TupleIssue.md)\> \| `undefined`\> \| [`TupleWithRestSchema`](../interfaces/TupleWithRestSchema.md)\<[`TupleItems`](../type-aliases/TupleItems.md), [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`TupleWithRestIssue`](../interfaces/TupleWithRestIssue.md)\> \| `undefined`\>

## Parameters

### schema

`TSchema`

The schema to get them from.

## Returns

[`InferFallbacks`](../type-aliases/InferFallbacks.md)\<`TSchema`\>

The fallback values.
