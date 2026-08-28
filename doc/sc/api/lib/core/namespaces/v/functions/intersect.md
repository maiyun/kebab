[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / intersect

# Function: intersect()

## Call Signature

> **intersect**\<`TOptions$1`\>(`options`): [`IntersectSchema`](../interfaces/IntersectSchema.md)\<`TOptions$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4627

Creates an intersect schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

### Parameters

#### options

`TOptions$1`

The intersect options.

### Returns

[`IntersectSchema`](../interfaces/IntersectSchema.md)\<`TOptions$1`, `undefined`\>

An intersect schema.

## Call Signature

> **intersect**\<`TOptions$1`, `TMessage`\>(`options`, `message`): [`IntersectSchema`](../interfaces/IntersectSchema.md)\<`TOptions$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4636

Creates an intersect schema.

### Type Parameters

#### TOptions$1

`TOptions$1` *extends* [`IntersectOptions`](../type-aliases/IntersectOptions.md)

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

[`IntersectSchema`](../interfaces/IntersectSchema.md)\<`TOptions$1`, `TMessage`\>

An intersect schema.
