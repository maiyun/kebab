[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / exactOptional

# Function: exactOptional()

## Call Signature

> **exactOptional**\<`TWrapped$1`\>(`wrapped`): [`ExactOptionalSchema`](../interfaces/ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4335

Creates an exact optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`ExactOptionalSchema`](../interfaces/ExactOptionalSchema.md)\<`TWrapped$1`, `undefined`\>

An exact optional schema.

## Call Signature

> **exactOptional**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`ExactOptionalSchema`](../interfaces/ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4344

Creates an exact optional schema.

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

[`ExactOptionalSchema`](../interfaces/ExactOptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

An exact optional schema.
