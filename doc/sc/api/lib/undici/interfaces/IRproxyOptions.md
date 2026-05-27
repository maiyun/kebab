[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:738](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L738)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:747](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L747)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:741](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L741)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:745](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L745)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:743](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L743)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:744](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L744)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:749](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L749)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:757](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L757)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:740](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L740)

秒数，默认 300 秒
