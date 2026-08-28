[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / intersectAsync

# Function: intersectAsync()

## Call Signature

> **intersectAsync**\<`TOptions$1`\>(`options`): [`IntersectSchemaAsync`](../interfaces/IntersectSchemaAsync.md)\<`TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4667

Creates an intersect schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`IntersectOptionsAsync`](../type-aliases/IntersectOptionsAsync.md)

### Parameters

#### options

`TOptions$1`

The intersect options.

### Returns

[`IntersectSchemaAsync`](../interfaces/IntersectSchemaAsync.md)\<`TOptions$1`, `undefined`\>

An intersect schema.

## Call Signature

> **intersectAsync**\<`TOptions$1`, `TMessage`\>(`options`, `message`): [`IntersectSchemaAsync`](../interfaces/IntersectSchemaAsync.md)\<`TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4676

Creates an intersect schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`IntersectOptionsAsync`](../type-aliases/IntersectOptionsAsync.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`IntersectIssue`](../interfaces/IntersectIssue.md)\> \| `undefined`

### Parameters

#### options

`TOptions$1`

The intersect options.

#### message

`TMessage`

The error message.

### Returns

[`IntersectSchemaAsync`](../interfaces/IntersectSchemaAsync.md)\<`TOptions$1`, `TMessage`\>

An intersect schema.
