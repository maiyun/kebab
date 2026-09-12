[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / domain

# Function: domain()

## Call Signature

> **domain**\<`TInput$1`\>(): [`DomainAction`](../interfaces/DomainAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8757

**`Beta`**

Creates a [domain name](https://en.wikipedia.org/wiki/Domain_name) validation
action.

Hint: ASCII-only validation. Internationalized domain names (IDNs) are not
supported, including Punycode-encoded labels.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`DomainAction`](../interfaces/DomainAction.md)\<`TInput$1`, `undefined`\>

A domain action.

## Call Signature

> **domain**\<`TInput$1`, `TMessage`\>(`message`): [`DomainAction`](../interfaces/DomainAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:8771

**`Beta`**

Creates a [domain name](https://en.wikipedia.org/wiki/Domain_name) validation
action.

Hint: ASCII-only validation. Internationalized domain names (IDNs) are not
supported, including Punycode-encoded labels.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`DomainIssue`](../interfaces/DomainIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`DomainAction`](../interfaces/DomainAction.md)\<`TInput$1`, `TMessage`\>

A domain action.
