[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/ws.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L81)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:91](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L91)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:89](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L89)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:87](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L87)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L88)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:95](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L95)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:93](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L93)

小帧模式，默认 false

***

### proxyMode?

> `optional` **proxyMode?**: `"request"` \| `"passthrough"`

Defined in: [lib/ws.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L83)

默认 passthrough 保留已有来源头；request 清理来源头；两者均使用目标 Host

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L85)

秒数
