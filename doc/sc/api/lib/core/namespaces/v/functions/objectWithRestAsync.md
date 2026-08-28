[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / objectWithRestAsync

# Function: objectWithRestAsync()

## Call Signature

> **objectWithRestAsync**\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): [`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6276

Creates an object with rest schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### rest

`TRest$1`

The rest schema.

### Returns

[`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

An object with rest schema.

## Call Signature

> **objectWithRestAsync**\<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): [`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6286

Creates an object with rest schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntriesAsync`](../interfaces/ObjectEntriesAsync.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectWithRestIssue`](../interfaces/ObjectWithRestIssue.md)\> \| `undefined`

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### rest

`TRest$1`

The rest schema.

#### message

`TMessage`

The error message.

### Returns

[`ObjectWithRestSchemaAsync`](../interfaces/ObjectWithRestSchemaAsync.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

An object with rest schema.
