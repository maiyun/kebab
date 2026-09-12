[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / rfcEmail

# Function: rfcEmail()

## Call Signature

> **rfcEmail**\<`TInput$1`\>(): [`RfcEmailAction`](../interfaces/RfcEmailAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14499

Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
validation action.

Hint: This validation action uses the regex defined by the HTML Living
Standard for `<input type="email">`, which covers most of RFC 5322 but
not all of it. For example, quoted local parts and comments are not
supported. If you are interested in an action that only validates common
email addresses, please use the `email` action instead.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`RfcEmailAction`](../interfaces/RfcEmailAction.md)\<`TInput$1`, `undefined`\>

A RFC email action.

## Call Signature

> **rfcEmail**\<`TInput$1`, `TMessage`\>(`message`): [`RfcEmailAction`](../interfaces/RfcEmailAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:14514

Creates a [RFC email](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1)
validation action.

Hint: This validation action uses the regex defined by the HTML Living
Standard for `<input type="email">`, which covers most of RFC 5322 but
not all of it. For example, quoted local parts and comments are not
supported. If you are interested in an action that only validates common
email addresses, please use the `email` action instead.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`RfcEmailIssue`](../interfaces/RfcEmailIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`RfcEmailAction`](../interfaces/RfcEmailAction.md)\<`TInput$1`, `TMessage`\>

A RFC email action.
