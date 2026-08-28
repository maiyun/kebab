[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / objectAsync

# Function: objectAsync()

## Call Signature

> **objectAsync**\<`TEntries$1`\>(`entries`): [`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6145

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObjectAsync`. To
return an issue for unknown entries, use `strictObjectAsync`. To include and
validate unknown entries, use `objectWithRestAsync`.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

### Parameters

#### entries

`TEntries$1`

The entries schema.

### Returns

[`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<`TEntries$1`, `undefined`\>

An object schema.

## Call Signature

> **objectAsync**\<`TEntries$1`, `TMessage`\>(`entries`, `message`): [`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6159

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObjectAsync`. To
return an issue for unknown entries, use `strictObjectAsync`. To include and
validate unknown entries, use `objectWithRestAsync`.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

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

[`ObjectSchemaAsync`](../interfaces/ObjectSchemaAsync.md)\<`TEntries$1`, `TMessage`\>

An object schema.
