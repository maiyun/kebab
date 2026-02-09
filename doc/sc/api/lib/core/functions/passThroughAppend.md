[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / passThroughAppend

# Function: passThroughAppend()

> **passThroughAppend**(`passThrough`, `data`, `end?`): `Promise`\<`void`\>

Defined in: [lib/core.ts:429](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L429)

调用前自行创建 passThrough，并且调用 pipe 绑定到应该绑定的对象，然后再调用本函数

## Parameters

### passThrough

`PassThrough`

passThrough 对象

### data

(`string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable` \| [`Response`](../../net/response/classes/Response.md))[]

数组

### end?

`boolean` = `true`

是否关闭写入，默认是，关闭后 passThrough 不能被写入，但仍然可读

## Returns

`Promise`\<`void`\>
