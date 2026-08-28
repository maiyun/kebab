[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nullableAsync

# Function: nullableAsync()

## Call Signature

> **nullableAsync**\<`TWrapped$1`\>(`wrapped`): [`NullableSchemaAsync`](../interfaces/NullableSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5875

Creates a nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NullableSchemaAsync`](../interfaces/NullableSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

A nullable schema.

## Call Signature

> **nullableAsync**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullableSchemaAsync`](../interfaces/NullableSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5884

Creates a nullable schema.

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

[`NullableSchemaAsync`](../interfaces/NullableSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

A nullable schema.
