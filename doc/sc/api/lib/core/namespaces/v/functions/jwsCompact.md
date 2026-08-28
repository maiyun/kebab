[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / jwsCompact

# Function: jwsCompact()

## Call Signature

> **jwsCompact**\<`TInput$1`\>(): [`JwsCompactAction`](../interfaces/JwsCompactAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11021

**`Beta`**

Creates a [JWS compact serialization](https://datatracker.ietf.org/doc/html/rfc7515#section-3.1)
validation action.

Hint: This validation action only checks the three-part compact string shape
with unpadded Base64URL-like segments. It does not decode the segments,
verify the signature, or validate claims.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`JwsCompactAction`](../interfaces/JwsCompactAction.md)\<`TInput$1`, `undefined`\>

A JWS compact action.

## Call Signature

> **jwsCompact**\<`TInput$1`, `TMessage`\>(`message`): [`JwsCompactAction`](../interfaces/JwsCompactAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:11036

**`Beta`**

Creates a [JWS compact serialization](https://datatracker.ietf.org/doc/html/rfc7515#section-3.1)
validation action.

Hint: This validation action only checks the three-part compact string shape
with unpadded Base64URL-like segments. It does not decode the segments,
verify the signature, or validate claims.

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`JwsCompactIssue`](../interfaces/JwsCompactIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`JwsCompactAction`](../interfaces/JwsCompactAction.md)\<`TInput$1`, `TMessage`\>

A JWS compact action.
