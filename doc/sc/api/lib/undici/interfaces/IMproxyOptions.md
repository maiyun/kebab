[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:780](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L780)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:789](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L789)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:783](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L783)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:787](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L787)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:785](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L785)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:786](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L786)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:791](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L791)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:782](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L782)

秒数，默认 300 秒
