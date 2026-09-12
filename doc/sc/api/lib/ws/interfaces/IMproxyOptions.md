[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/ws.ts:80](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L80)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/ws.ts:88](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L88)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../../undici/type-aliases/THttpHeaders.md)

Defined in: [lib/ws.ts:86](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L86)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/ws.ts:84](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L84)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/ws.ts:85](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L85)

***

### masking?

> `optional` **masking?**: `boolean`

Defined in: [lib/ws.ts:92](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L92)

加密模式，默认 true

***

### mode?

> `optional` **mode?**: [`EFrameReceiveMode`](../enumerations/EFrameReceiveMode.md)

Defined in: [lib/ws.ts:90](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L90)

小帧模式，默认 false

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/ws.ts:82](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L82)

秒数
