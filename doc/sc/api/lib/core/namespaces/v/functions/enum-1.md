[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / enum\_

# Function: enum\_()

## Call Signature

> **enum\_**\<`TEnum`\>(`enum__`): [`EnumSchema`](../interfaces/EnumSchema.md)\<`TEnum`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4291

Creates an enum schema.

### Type Parameters

#### TEnum

`TEnum` *extends* [`Enum`](../interfaces/Enum.md)

### Parameters

#### enum\_\_

`TEnum`

The enum object.

### Returns

[`EnumSchema`](../interfaces/EnumSchema.md)\<`TEnum`, `undefined`\>

An enum schema.

## Call Signature

> **enum\_**\<`TEnum`, `TMessage`\>(`enum__`, `message`): [`EnumSchema`](../interfaces/EnumSchema.md)\<`TEnum`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4300

Creates an enum schema.

### Type Parameters

#### TEnum

`TEnum` *extends* [`Enum`](../interfaces/Enum.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EnumIssue`](../interfaces/EnumIssue.md)\> \| `undefined`

### Parameters

#### enum\_\_

`TEnum`

The enum object.

#### message

`TMessage`

The error message.

### Returns

[`EnumSchema`](../interfaces/EnumSchema.md)\<`TEnum`, `TMessage`\>

An enum schema.
