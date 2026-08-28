[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / literal

# Function: literal()

## Call Signature

> **literal**\<`TLiteral`\>(`literal_`): [`LiteralSchema`](../interfaces/LiteralSchema.md)\<`TLiteral`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4790

Creates a literal schema.

### Type Parameters

#### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

### Parameters

#### literal\_

`TLiteral`

The literal value.

### Returns

[`LiteralSchema`](../interfaces/LiteralSchema.md)\<`TLiteral`, `undefined`\>

A literal schema.

## Call Signature

> **literal**\<`TLiteral`, `TMessage`\>(`literal_`, `message`): [`LiteralSchema`](../interfaces/LiteralSchema.md)\<`TLiteral`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4799

Creates a literal schema.

### Type Parameters

#### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LiteralIssue`](../interfaces/LiteralIssue.md)\> \| `undefined`

### Parameters

#### literal\_

`TLiteral`

The literal value.

#### message

`TMessage`

The error message.

### Returns

[`LiteralSchema`](../interfaces/LiteralSchema.md)\<`TLiteral`, `TMessage`\>

A literal schema.
