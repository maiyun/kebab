[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/ws.ts:99](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L99)

反向代理请求的传入参数选项

## Extends

- [`IProxyHeaderOptions`](../../undici/proxy/interfaces/IProxyHeaderOptions.md)

## Properties

### closeReason?

> `optional` **closeReason?**: (`info`) => `string`

Defined in: [lib/ws.ts:122](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L122)

生成回传给另一侧的 WebSocket 关闭原因，仅在管道断开时调用

#### Parameters

##### info

[`IPipeCloseInfo`](IPipeCloseInfo.md)

#### Returns

`string`

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:107](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L107)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:105](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L105)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:103](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L103)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L104)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:111](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L111)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:109](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L109)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ws.ts:113](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L113)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### onClose?

> `optional` **onClose?**: (`info`) => `void`

Defined in: [lib/ws.ts:120](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L120)

管道关闭回调，返回首先关闭的一侧及其底层事件

#### Parameters

##### info

[`IPipeCloseInfo`](IPipeCloseInfo.md)

#### Returns

`void`

***

### onConnectError?

> `optional` **onConnectError?**: (`error`) => `void`

Defined in: [lib/ws.ts:118](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L118)

连接目标 WebSocket 失败回调

#### Parameters

##### error

`unknown`

#### Returns

`void`

***

### proxyMode?

> `optional` **proxyMode?**: `"reverse"` \| `"request"` \| `"passthrough"`

Defined in: lib/undici/proxy.ts:14

默认 passthrough 透传；request 使用目标 Host 并清理代理来源头；reverse 保留外部 Host 并生成来源头
passthrough 使用目标 Host，保留通过基础过滤的来路头，不自动生成来源头。
request/reverse 均清理传入的 Forwarded、X-Forwarded-*、Via、X-Real-IP 及 CDN 来源头。
reverse 的协议和 IP 仅取实际连接，不信任来路代理头；可信代理信息由业务验证后通过 headers 覆盖。

#### Inherited from

[`IProxyHeaderOptions`](../../undici/proxy/interfaces/IProxyHeaderOptions.md).[`proxyMode`](../../undici/proxy/interfaces/IProxyHeaderOptions.md#proxymode)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L101)

秒数
