[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / mapAsync

# Function: mapAsync()

## Call Signature

> **mapAsync**\<`TKey$1`, `TValue$1`\>(`key`, `value`): [`MapSchemaAsync`](../interfaces/MapSchemaAsync.md)\<`TKey$1`, `TValue$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5138

Creates a map schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### key

`TKey$1`

The key schema.

#### value

`TValue$1`

The value schema.

### Returns

[`MapSchemaAsync`](../interfaces/MapSchemaAsync.md)\<`TKey$1`, `TValue$1`, `undefined`\>

A map schema.

## Call Signature

> **mapAsync**\<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): [`MapSchemaAsync`](../interfaces/MapSchemaAsync.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5148

Creates a map schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`MapIssue`](../interfaces/MapIssue.md)\> \| `undefined`

### Parameters

#### key

`TKey$1`

The key schema.

#### value

`TValue$1`

The value schema.

#### message

`TMessage`

The error message.

### Returns

[`MapSchemaAsync`](../interfaces/MapSchemaAsync.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

A map schema.
