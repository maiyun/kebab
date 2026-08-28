[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / object

# Function: object()

## Call Signature

> **object**\<`TEntries$1`\>(`entries`): [`ObjectSchema`](../interfaces/ObjectSchema.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6091

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`ObjectSchema`](../interfaces/ObjectSchema.md)\<`TEntries$1`, `undefined`\>

An object schema.

## Call Signature

> **object**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`ObjectSchema`](../interfaces/ObjectSchema.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6105

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](../interfaces/ObjectIssue.md)\> \| `undefined`

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### message

`TMessage`

The error message.

### Returns

[`ObjectSchema`](../interfaces/ObjectSchema.md)\<`TEntries$1`, `TMessage`\>

An object schema.
