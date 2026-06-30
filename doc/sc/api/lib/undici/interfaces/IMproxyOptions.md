[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:803](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L803)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:812](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L812)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:806](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L806)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:810](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L810)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:808](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L808)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:809](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L809)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:814](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L814)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:805](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L805)

秒数，默认 300 秒
