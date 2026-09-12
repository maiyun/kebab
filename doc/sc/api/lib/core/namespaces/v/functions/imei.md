[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / imei

# Function: imei()

## Call Signature

> **imei**\<`TInput$1`\>(): [`ImeiAction`](../interfaces/ImeiAction.md)\<`TInput$1`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9969

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

Formats:
- AABBBBBBCCCCCCD
- AA-BBBBBB-CCCCCC-D

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

### Returns

[`ImeiAction`](../interfaces/ImeiAction.md)\<`TInput$1`, `undefined`\>

An IMEI action.

## Call Signature

> **imei**\<`TInput$1`, `TMessage`\>(`message`): [`ImeiAction`](../interfaces/ImeiAction.md)\<`TInput$1`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:9981

Creates an [IMEI](https://en.wikipedia.org/wiki/International_Mobile_Equipment_Identity) validation action.

Formats:
- AABBBBBBCCCCCCD
- AA-BBBBBB-CCCCCC-D

### Type Parameters

#### TInput$1

`TInput$1` *extends* `string`

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ImeiIssue`](../interfaces/ImeiIssue.md)\<`TInput$1`\>\> \| `undefined`

### Parameters

#### message

`TMessage`

The error message.

### Returns

[`ImeiAction`](../interfaces/ImeiAction.md)\<`TInput$1`, `TMessage`\>

An IMEI action.
