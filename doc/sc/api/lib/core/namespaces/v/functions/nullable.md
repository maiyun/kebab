[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / nullable

# Function: nullable()

## Call Signature

> **nullable**\<`TWrapped$1`\>(`wrapped`): [`NullableSchema`](../interfaces/NullableSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5831

Creates a nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`NullableSchema`](../interfaces/NullableSchema.md)\<`TWrapped$1`, `undefined`\>

A nullable schema.

## Call Signature

> **nullable**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`NullableSchema`](../interfaces/NullableSchema.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5840

Creates a nullable schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`NullableSchema`](../interfaces/NullableSchema.md)\<`TWrapped$1`, `TDefault`\>

A nullable schema.
