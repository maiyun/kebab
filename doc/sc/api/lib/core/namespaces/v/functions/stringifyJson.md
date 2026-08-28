[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / stringifyJson

# Function: stringifyJson()

## Call Signature

> **stringifyJson**\<`TInput$1`\>(): [`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `undefined`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14609

**`Beta`**

Creates a stringify JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

### Returns

[`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `undefined`, `undefined`\>

A stringify JSON action.

## Call Signature

> **stringifyJson**\<`TInput$1`, `TConfig`\>(`config`): [`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14619

**`Beta`**

Creates a stringify JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TConfig

`TConfig` *extends* [`StringifyJsonConfig`](../interfaces/StringifyJsonConfig.md) \| `undefined`

### Parameters

#### config

`TConfig`

The action config.

### Returns

[`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `TConfig`, `undefined`\>

A stringify JSON action.

## Call Signature

> **stringifyJson**\<`TInput$1`, `TConfig`, `TMessage`\>(`config`, `message`): [`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14630

**`Beta`**

Creates a stringify JSON transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TConfig

`TConfig` *extends* [`StringifyJsonConfig`](../interfaces/StringifyJsonConfig.md) \| `undefined`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StringifyJsonIssue`](../interfaces/StringifyJsonIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### config

`TConfig`

The action config.

#### message

`TMessage`

The error message.

### Returns

[`StringifyJsonAction`](../interfaces/StringifyJsonAction.md)\<`TInput$1`, `TConfig`, `TMessage`\>

A stringify JSON action.
