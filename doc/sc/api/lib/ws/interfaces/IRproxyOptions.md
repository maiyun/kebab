[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/ws.ts:96](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L96)

反向代理请求的传入参数选项

## Properties

### closeReason?

> `optional` **closeReason?**: (`info`) => `string`

Defined in: [lib/ws.ts:119](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L119)

生成回传给另一侧的 WebSocket 关闭原因，仅在管道断开时调用

#### Parameters

##### info

[`IPipeCloseInfo`](IPipeCloseInfo.md)

#### Returns

`string`

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:104](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L104)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:102](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L102)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:100](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L100)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:101](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L101)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:108](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L108)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:106](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L106)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/ws.ts:110](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L110)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### onClose?

> `optional` **onClose?**: (`info`) => `void`

Defined in: [lib/ws.ts:117](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L117)

管道关闭回调，返回首先关闭的一侧及其底层事件

#### Parameters

##### info

[`IPipeCloseInfo`](IPipeCloseInfo.md)

#### Returns

`void`

***

### onConnectError?

> `optional` **onConnectError?**: (`error`) => `void`

Defined in: [lib/ws.ts:115](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L115)

连接目标 WebSocket 失败回调

#### Parameters

##### error

`unknown`

#### Returns

`void`

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:98](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L98)

秒数
