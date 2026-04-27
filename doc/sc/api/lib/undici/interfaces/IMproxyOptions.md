[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:704](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L704)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L713)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:707](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L707)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L711)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:709](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L709)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L710)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L715)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L706)

秒数
