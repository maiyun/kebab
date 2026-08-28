[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / record

# Function: record()

## Call Signature

> **record**\<`TKey$1`, `TValue$1`\>(`key`, `value`): [`RecordSchema`](../interfaces/RecordSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6589

Creates a record schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`string`, `string` \| `number` \| `symbol`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### key

`TKey$1`

The key schema.

#### value

`TValue$1`

The value schema.

### Returns

[`RecordSchema`](../interfaces/RecordSchema.md)\<`TKey$1`, `TValue$1`, `undefined`\>

A record schema.

## Call Signature

> **record**\<`TKey$1`, `TValue$1`, `TMessage`\>(`key`, `value`, `message`): [`RecordSchema`](../interfaces/RecordSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6599

Creates a record schema.

### Type Parameters

#### TKey$1

`TKey$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`string`, `string` \| `number` \| `symbol`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TValue$1

`TValue$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RecordIssue`](../interfaces/RecordIssue.md)\> \| `undefined`

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

[`RecordSchema`](../interfaces/RecordSchema.md)\<`TKey$1`, `TValue$1`, `TMessage`\>

A record schema.
