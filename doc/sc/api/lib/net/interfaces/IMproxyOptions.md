[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L727)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:736](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L736)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:730](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L730)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L734)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:732](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L732)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L733)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:738](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L738)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L729)

秒数
