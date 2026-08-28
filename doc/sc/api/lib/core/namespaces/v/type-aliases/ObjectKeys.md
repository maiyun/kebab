[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / ObjectKeys

# Type Alias: ObjectKeys\<TSchema\>

> **ObjectKeys**\<`TSchema`\> = `MaybeReadonly`\<\[keyof `TSchema`\[`"entries"`\], `...(keyof TSchema["entries"])[]`\]\>

Defined in: node\_modules/valibot/dist/index.d.mts:3435

Object keys type.

## Type Parameters

### TSchema

`TSchema` *extends* [`LooseObjectSchema`](../interfaces/LooseObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> \| [`LooseObjectSchemaAsync`](../interfaces/LooseObjectSchemaAsync.md)\<[`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md), [`ErrorMessage`](ErrorMessage.md)\<[`LooseObjectIssue`](../interfaces/LooseObjectIssue.md)\> \| `undefined`\> \| [`ObjectSchema`](../interfaces/ObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<[`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md), [`ErrorMessage`](ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`\> \| [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> \| [`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<[`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md), [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`\> \| [`StrictObjectSchema`](../interfaces/StrictObjectSchema.md)\<[`ObjectEntries`](../interfaces/ObjectEntries.md), [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\> \| [`StrictObjectSchemaAsync`](../interfaces/StrictObjectSchemaAsync.md)\<[`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md), [`ErrorMessage`](ErrorMessage.md)\<[`StrictObjectIssue`](../interfaces/StrictObjectIssue.md)\> \| `undefined`\>
