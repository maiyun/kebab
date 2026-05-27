[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:723](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L723)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:732](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L732)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L726)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:730](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L730)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:728](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L728)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L729)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L734)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:725](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L725)

秒数，默认 300 秒
