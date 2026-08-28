[**Documents for @maiyunnet/kebab**](../../../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../../../index.md) / [lib/core](../../../index.md) / [v](../index.md) / instance

# Function: instance()

## Call Signature

> **instance**\<`TClass`\>(`class_`): [`InstanceSchema`](../interfaces/InstanceSchema.md)\<`TClass`, `undefined`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4548

Creates an instance schema.

### Type Parameters

#### TClass

`TClass` *extends* [`Class`](../type-aliases/Class.md)

### Parameters

#### class\_

`TClass`

The class of the instance.

### Returns

[`InstanceSchema`](../interfaces/InstanceSchema.md)\<`TClass`, `undefined`\>

An instance schema.

## Call Signature

> **instance**\<`TClass`, `TMessage`\>(`class_`, `message`): [`InstanceSchema`](../interfaces/InstanceSchema.md)\<`TClass`, `TMessage`\>

Defined in: node\_modules/valibot/dist/index.d.mts:4557

Creates an instance schema.

### Type Parameters

#### TClass

`TClass` *extends* [`Class`](../type-aliases/Class.md)

#### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`InstanceIssue`](../interfaces/InstanceIssue.md)\> \| `undefined`

### Parameters

#### class\_

`TClass`

The class of the instance.

#### message

`TMessage`

The error message.

### Returns

[`InstanceSchema`](../interfaces/InstanceSchema.md)\<`TClass`, `TMessage`\>

An instance schema.
