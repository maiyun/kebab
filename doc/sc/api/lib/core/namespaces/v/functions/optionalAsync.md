[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / optionalAsync

# Function: optionalAsync()

## Call Signature

> **optionalAsync**\<`TWrapped$1`\>(`wrapped`): [`OptionalSchemaAsync`](../interfaces/OptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6371

Creates an optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`OptionalSchemaAsync`](../interfaces/OptionalSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

An optional schema.

## Call Signature

> **optionalAsync**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`OptionalSchemaAsync`](../interfaces/OptionalSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6380

Creates an optional schema.

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

[`OptionalSchemaAsync`](../interfaces/OptionalSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

An optional schema.
