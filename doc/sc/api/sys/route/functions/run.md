[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [sys/route](../index.md) / run

# Function: run()

> **run**(`data`): `Promise`\<`boolean`\>

Defined in: [sys/route.ts:76](https://github.com/maiyunnet/kebab/blob/master/sys/route.ts#L76)

若为动态路径则执行此函数，此函数不进行判断 kebab.json 是否存在

## Parameters

### data

传导的数据

#### head?

`Buffer`\<`ArrayBufferLike`\>

WebSocket 的 head 数据

#### path

`string`

前面不带 /，末尾不一定，以用户请求为准

#### req

`IncomingMessage` \| `Http2ServerRequest`

#### res?

`Http2ServerResponse`\<`Http2ServerRequest`\> \| `ServerResponse`\<`IncomingMessage`\>

#### rootPath

`string`

虚拟主机当前动态目录的绝对根目录，末尾带 /

#### socket?

`Socket`

WebSocket 连接的 socket 对象

#### timer?

\{ `callback`: () => `void`; `timeout`: `number`; `timer`: `Timeout`; \}

timeout timer

#### timer.callback

() => `void`

#### timer.timeout

`number`

#### timer.timer

`Timeout`

#### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

#### urlBase

`string`

base url，如 /abc/vhost/，前后都带 /

## Returns

`Promise`\<`boolean`\>
