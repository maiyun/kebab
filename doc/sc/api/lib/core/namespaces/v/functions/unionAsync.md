[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / unionAsync

# Function: unionAsync()

## Call Signature

> **unionAsync**\<`TOptions$1`\>(`options`): [`UnionSchemaAsync`](../interfaces/UnionSchemaAsync.md)\<`TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5358

Creates an union schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`UnionOptionsAsync`](../type-aliases/UnionOptionsAsync.md)

### Parameters

#### options

`TOptions$1`

The union options.

### Returns

[`UnionSchemaAsync`](../interfaces/UnionSchemaAsync.md)\<`TOptions$1`, `undefined`\>

An union schema.

## Call Signature

> **unionAsync**\<`TOptions$1`, `TMessage`\>(`options`, `message`): [`UnionSchemaAsync`](../interfaces/UnionSchemaAsync.md)\<`TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:5367

Creates an union schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`UnionOptionsAsync`](../type-aliases/UnionOptionsAsync.md)

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

[`UnionSchemaAsync`](../interfaces/UnionSchemaAsync.md)\<`TOptions$1`, `TMessage`\>

An union schema.
