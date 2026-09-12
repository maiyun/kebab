[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / guard

# Function: guard()

## Call Signature

> **guard**\<`TInput$1`, `TGuard`\>(`requirement`): [`GuardAction`](../interfaces/GuardAction.md)\<`TInput$1`, `TGuard`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9651

**`Beta`**

Creates a guard transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`TInput$1`\>

### Parameters

#### requirement

`TGuard`

The guard function.

### Returns

[`GuardAction`](../interfaces/GuardAction.md)\<`TInput$1`, `TGuard`, `undefined`\>

A guard action.

## Call Signature

> **guard**\<`TGuard`\>(`requirement`): [`GuardAction`](../interfaces/GuardAction.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9661

**`Beta`**

Creates a guard transformation action.

### Type Parameters

#### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`any`\>

### Parameters

#### requirement

`TGuard`

The guard function.

### Returns

[`GuardAction`](../interfaces/GuardAction.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `undefined`\>

A guard action.

## Call Signature

> **guard**\<`TInput$1`, `TGuard`, `TMessage`\>(`requirement`, `message`): [`GuardAction`](../interfaces/GuardAction.md)\<`TInput$1`, `TGuard`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9672

**`Beta`**

Creates a guard transformation action.

### Type Parameters

#### TInput$1

`TInput$1`

#### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`TInput$1`\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GuardIssue`](../interfaces/GuardIssue.md)\<`TInput$1`, `TGuard`\>\> \| `undefined`

### Parameters

#### requirement

`TGuard`

The guard function.

#### message

`TMessage`

The error message.

### Returns

[`GuardAction`](../interfaces/GuardAction.md)\<`TInput$1`, `TGuard`, `TMessage`\>

A guard action.

## Call Signature

> **guard**\<`TGuard`, `TMessage`\>(`requirement`, `message`): [`GuardAction`](../interfaces/GuardAction.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9683

**`Beta`**

Creates a guard transformation action.

### Type Parameters

#### TGuard

`TGuard` *extends* [`GuardFunction`](../type-aliases/GuardFunction.md)\<`any`\>

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`GuardIssue`](../interfaces/GuardIssue.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`\>\> \| `undefined`

### Parameters

#### requirement

`TGuard`

The guard function.

#### message

`TMessage`

The error message.

### Returns

[`GuardAction`](../interfaces/GuardAction.md)\<`Parameters`\<`TGuard`\>\[`0`\], `TGuard`, `TMessage`\>

A guard action.
