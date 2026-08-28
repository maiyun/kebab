[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / optional

# Function: optional()

## Call Signature

> **optional**\<`TWrapped$1`\>(`wrapped`): [`OptionalSchema`](../interfaces/OptionalSchema.md)\<`TWrapped$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6327

Creates an optional schema.

### Type Parameters

#### TWrapped$1

`TWrapped$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### wrapped

`TWrapped$1`

The wrapped schema.

### Returns

[`OptionalSchema`](../interfaces/OptionalSchema.md)\<`TWrapped$1`, `undefined`\>

An optional schema.

## Call Signature

> **optional**\<`TWrapped$1`, `TDefault`\>(`wrapped`, `default_`): [`OptionalSchema`](../interfaces/OptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6336

Creates an optional schema.

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

[`OptionalSchema`](../interfaces/OptionalSchema.md)\<`TWrapped$1`, `TDefault`\>

An optional schema.
