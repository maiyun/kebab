[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:756](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L756)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:765](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L765)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:759](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L759)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:763](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L763)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:761](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L761)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:762](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L762)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:767](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L767)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:758](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L758)

秒数，默认 300 秒
