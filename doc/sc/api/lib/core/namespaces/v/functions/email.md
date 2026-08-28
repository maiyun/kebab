[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / email

# Function: email()

## Call Signature

> **email**\<`TInput$1`\>(): [`EmailAction`](../interfaces/EmailAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8765

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
action.

Hint: This validation action intentionally only validates common email
addresses. If you are interested in an action that covers a broader
subset of RFC 5322 addresses, please use the `rfcEmail` action instead.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`EmailAction`](../interfaces/EmailAction.md)\<`TInput$1`, `undefined`\>

An email action.

## Call Signature

> **email**\<`TInput$1`, `TMessage`\>(`message`): [`EmailAction`](../interfaces/EmailAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8778

Creates an [email](https://en.wikipedia.org/wiki/Email_address) validation
action.

Hint: This validation action intentionally only validates common email
addresses. If you are interested in an action that covers a broader
subset of RFC 5322 addresses, please use the `rfcEmail` action instead.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`EmailIssue`](../interfaces/EmailIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`EmailAction`](../interfaces/EmailAction.md)\<`TInput$1`, `TMessage`\>

An email action.
