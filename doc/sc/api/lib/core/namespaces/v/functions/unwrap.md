[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / unwrap

# Function: unwrap()

> **unwrap**\<`TSchema`\>(`schema`): `TSchema`\[`"wrapped"`\]

Defined in: node\_modules/valibot/dist/index.d.mts:2868

Unwraps the wrapped schema.

## Type Parameters

### TSchema

`TSchema` *extends* [`ExactOptionalSchema`](../interfaces/ExactOptionalSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`NullishSchema`](../interfaces/NullishSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`OptionalSchema`](../interfaces/OptionalSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`ExactOptionalSchemaAsync`](../interfaces/ExactOptionalSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`NullishSchemaAsync`](../interfaces/NullishSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`OptionalSchemaAsync`](../interfaces/OptionalSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`NonNullableSchema`](../interfaces/NonNullableSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](../interfaces/NonNullableIssue.md)\> \| `undefined`\> \| [`NonNullishSchema`](../interfaces/NonNullishSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](../interfaces/NonNullishIssue.md)\> \| `undefined`\> \| [`NonOptionalSchema`](../interfaces/NonOptionalSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`\> \| [`NullableSchema`](../interfaces/NullableSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`UndefinedableSchema`](../interfaces/UndefinedableSchema.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`NonNullableSchemaAsync`](../interfaces/NonNullableSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullableIssue`](../interfaces/NonNullableIssue.md)\> \| `undefined`\> \| [`NonNullishSchemaAsync`](../interfaces/NonNullishSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonNullishIssue`](../interfaces/NonNullishIssue.md)\> \| `undefined`\> \| [`NonOptionalSchemaAsync`](../interfaces/NonOptionalSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NonOptionalIssue`](../interfaces/NonOptionalIssue.md)\> \| `undefined`\> \| [`NullableSchemaAsync`](../interfaces/NullableSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\> \| [`UndefinedableSchemaAsync`](../interfaces/UndefinedableSchemaAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `unknown`\>

## Parameters

### schema

`TSchema`

The schema to be unwrapped.

## Returns

`TSchema`\[`"wrapped"`\]

The unwrapped schema.
