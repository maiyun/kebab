[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:870](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L870)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:879](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L879)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:873](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L873)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:877](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L877)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:875](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L875)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:876](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L876)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:881](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L881)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:872](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L872)

秒数，默认 300 秒
