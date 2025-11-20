[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/ws.ts:71](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L71)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/ws.ts:79](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L79)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../../net/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:77](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L77)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:75](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L75)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/ws.ts:76](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L76)

***

### masking?

> `optional` **masking**: `boolean`

Defined in: [lib/ws.ts:83](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L83)

加密模式，默认 true

***

### mode?

> `optional` **mode**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:81](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L81)

小帧模式，默认 false

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/ws.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L85)

正向 mproxy 代理，url 如 wss://xxx/abc

#### auth

> **auth**: `string`

#### url

> **url**: `string`

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/ws.ts:73](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L73)

秒数
