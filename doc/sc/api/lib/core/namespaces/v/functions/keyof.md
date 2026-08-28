[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / keyof

# Function: keyof()

## Call Signature

> **keyof**\<`TSchema`\>(`schema`): [`PicklistSchema`](../interfaces/PicklistSchema.md)\<`ForceTuple`\<`UnionToTupleHelper`\<keyof `TSchema`\[`"entries"`\], \[\]\>\>, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1417

Creates a picklist schema of object keys.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$10`

### Parameters

#### schema

`TSchema`

The object schema.

### Returns

[`PicklistSchema`](../interfaces/PicklistSchema.md)\<`ForceTuple`\<`UnionToTupleHelper`\<keyof `TSchema`\[`"entries"`\], \[\]\>\>, `undefined`\>

A picklist schema.

## Call Signature

> **keyof**\<`TSchema`, `TMessage`\>(`schema`, `message`): [`PicklistSchema`](../interfaces/PicklistSchema.md)\<`ForceTuple`\<`UnionToTupleHelper`\<keyof `TSchema`\[`"entries"`\], \[\]\>\>, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:1426

Creates a picklist schema of object keys.

### Type Parameters

#### TSchema

`TSchema` *extends* `Schema$10`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`PicklistIssue`](../interfaces/PicklistIssue.md)\> \| `undefined`

### Parameters

#### schema

`TSchema`

The object schema.

#### message

`TMessage`

The error message.

### Returns

[`PicklistSchema`](../interfaces/PicklistSchema.md)\<`ForceTuple`\<`UnionToTupleHelper`\<keyof `TSchema`\[`"entries"`\], \[\]\>\>, `TMessage`\>

A picklist schema.
