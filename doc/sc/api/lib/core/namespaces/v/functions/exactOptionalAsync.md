[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / exactOptionalAsync

# Function: exactOptionalAsync()

## Call Signature

> **exactOptionalAsync**\<`TWrapped$1`\>(`wrapped`): [`ExactOptionalSchemaAsync`](../interfaces/ExactOptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4379

Creates an exact optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`ExactOptionalSchemaAsync`](../interfaces/ExactOptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

An exact optional schema.

## Call Signature

> **exactOptionalAsync**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`ExactOptionalSchemaAsync`](../interfaces/ExactOptionalSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4388

Creates an exact optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TDefault

`TDefault` *extends* `unknown`

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

#### default\_

`TDefault`

The default value.

### Returns

[`ExactOptionalSchemaAsync`](../interfaces/ExactOptionalSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

An exact optional schema.
