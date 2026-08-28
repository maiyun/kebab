[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / parseJson

# Function: parseJson()

## Call Signature

> **parseJson**\<`TInput$1`\>(): [`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `undefined`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13531

**`Beta`**

Creates a parse JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `undefined`, `undefined`\>

A parse JSON action.

## Call Signature

> **parseJson**\<`TInput$1`, `TConfig`\>(`config`): [`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13541

**`Beta`**

Creates a parse JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TConfig

`TConfig` *extends* [`ParseJsonConfig`](../interfaces/ParseJsonConfig.md) \| `undefined`

### Parameters

#### config

`TConfig`

The action config.

### Returns

[`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

A parse JSON action.

## Call Signature

> **parseJson**\<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): [`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:13552

**`Beta`**

Creates a parse JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TConfig

`TConfig` *extends* [`ParseJsonConfig`](../interfaces/ParseJsonConfig.md) \| `undefined`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ParseJsonIssue`](../interfaces/ParseJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### config

`TConfig`

The action config.

#### message

`TMessage`

The error message.

### Returns

[`ParseJsonAction`](../interfaces/ParseJsonAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

A parse JSON action.
