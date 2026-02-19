[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:889](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L889)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:898](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L898)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:892](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L892)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:896](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L896)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:894](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L894)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:895](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L895)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:900](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L900)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:891](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L891)

秒数
