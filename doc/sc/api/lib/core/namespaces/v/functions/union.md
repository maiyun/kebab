[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / union

# Function: union()

## Call Signature

> **union**\<`TOptions$1`\>(`options`): [`UnionSchema`](../interfaces/UnionSchema.md)\<`TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5314

Creates an union schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`UnionOptions`](../type-aliases/UnionOptions.md)

### Parameters

#### options

`TOptions$1`

The union options.

### Returns

[`UnionSchema`](../interfaces/UnionSchema.md)\<`TOptions$1`, `undefined`\>

An union schema.

## Call Signature

> **union**\<`TOptions$1`, `TMessage`\>(`options`, `message`): [`UnionSchema`](../interfaces/UnionSchema.md)\<`TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5323

Creates an union schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`UnionOptions`](../type-aliases/UnionOptions.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`UnionIssue`](../interfaces/UnionIssue.md)\<[`InferIssue`](../type-aliases/InferIssue.md)\<`TOptions$1`\[`number`\]\>\>\> \| `undefined`

### Parameters

#### options

`TOptions$1`

The union options.

#### message

`TMessage`

The error message.

### Returns

[`UnionSchema`](../interfaces/UnionSchema.md)\<`TOptions$1`, `TMessage`\>

An union schema.
