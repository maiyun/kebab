[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / rsocket

# Function: rsocket()

> **rsocket**(`ctr`, `host`, `port`): `Promise`\<`boolean`\>

Defined in: [lib/ws.ts:555](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L555)

反向代理，将本 websocket 连接反代到其他真正的 socket，在 ws 的 onLoad 事件中使用

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### host

`string`

反代真实请求地址

### port

`number`

反代真实请求端口

## Returns

`Promise`\<`boolean`\>
