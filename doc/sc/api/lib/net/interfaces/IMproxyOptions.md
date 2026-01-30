[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:856](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L856)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:865](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L865)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:859](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L859)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:863](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L863)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:861](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L861)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:862](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L862)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:867](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L867)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:858](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L858)

秒数
