[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / objectWithRest

# Function: objectWithRest()

## Call Signature

> **objectWithRest**\<`TEntries$1`, `TRest$1`\>(`entries`, `rest`): [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6222

Creates an object with rest schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### Parameters

#### entries

`TEntries$1`

The entries schema.

#### rest

`TRest$1`

The rest schema.

### Returns

[`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `undefined`\>

An object with rest schema.

## Call Signature

> **objectWithRest**\<`TEntries$1`, `TRest$1`, `TMessage`\>(`entries`, `rest`, `message`): [`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:6232

Creates an object with rest schema.

### Type Parameters

#### TEntries$1

`TEntries$1` *extends* [`ObjectEntries`](../interfaces/ObjectEntries.md)

#### TRest$1

`TRest$1` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

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

[`ObjectWithRestSchema`](../interfaces/ObjectWithRestSchema.md)\<`TEntries$1`, `TRest$1`, `TMessage`\>

An object with rest schema.
