[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:743](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L743)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:752](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L752)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:746](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L746)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:750](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L750)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:748](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L748)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:749](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L749)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:754](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L754)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:745](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L745)

秒数，默认 300 秒
