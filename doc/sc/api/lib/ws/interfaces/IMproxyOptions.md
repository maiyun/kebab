[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/ws.ts:56](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L56)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:64](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L64)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:62](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L62)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:60](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L60)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:61](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L61)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:68](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L68)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:66](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L66)

小帧模式，默认 false

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:58](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L58)

秒数
