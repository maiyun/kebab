[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nullishAsync

# Function: nullishAsync()

## Call Signature

> **nullishAsync**\<`TWrapped$1`\>(`wrapped`): [`NullishSchemaAsync`](../interfaces/NullishSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5969

Creates a nullish schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NullishSchemaAsync`](../interfaces/NullishSchemaAsync.md)\<`TWrapped$1`, `undefined`\>

A nullish schema.

## Call Signature

> **nullishAsync**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullishSchemaAsync`](../interfaces/NullishSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5978

Creates a nullish schema.

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

[`NullishSchemaAsync`](../interfaces/NullishSchemaAsync.md)\<`TWrapped$1`, `TDefault`\>

A nullish schema.
