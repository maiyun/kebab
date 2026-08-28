[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parseBoolean

# Function: parseBoolean()

## Call Signature

> **parseBoolean**\<`TInput$1`\>(): [`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `undefined`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13443

**`Beta`**

Creates a parse boolean transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

### Returns

[`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `undefined`, `undefined`\>

A parse boolean action.

## Call Signature

> **parseBoolean**\<`TInput$1`, `TConfig`\>(`config`): [`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13453

**`Beta`**

Creates a parse boolean transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TConfig

`TConfig` *extends* [`ParseBooleanConfig`](../interfaces/ParseBooleanConfig.md) \| `undefined`

### Parameters

#### config

`TConfig`

The parse boolean config.

### Returns

[`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

A parse boolean action.

## Call Signature

> **parseBoolean**\<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): [`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13464

**`Beta`**

Creates a parse boolean transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TConfig

`TConfig` *extends* [`ParseBooleanConfig`](../interfaces/ParseBooleanConfig.md) \| `undefined`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseBooleanIssue`](../interfaces/ParseBooleanIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### config

`TConfig`

The parse boolean config.

#### message

`TMessage`

The error message.

### Returns

[`ParseBooleanAction`](../interfaces/ParseBooleanAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

A parse boolean action.
