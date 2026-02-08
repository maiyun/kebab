[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:865](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L865)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:874](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L874)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:868](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L868)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:872](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L872)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:870](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L870)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:871](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L871)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:876](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L876)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:867](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L867)

秒数
