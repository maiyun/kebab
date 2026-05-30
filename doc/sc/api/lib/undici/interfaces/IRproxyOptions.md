[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:760](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L760)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:769](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L769)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:763](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L763)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:767](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L767)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:765](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L765)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:766](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L766)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:771](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L771)

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

### querys?

> `optional` **querys?**: `Record`\<`string`, `any`\>

Defined in: [lib/undici.ts:781](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L781)

追加的 GET 查询参数，会与代理目标 URL 已有 query string 合并（同名参数覆盖）

***

### querysBlacklist?

> `optional` **querysBlacklist?**: `string`[]

Defined in: [lib/undici.ts:779](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L779)

需要从原始 URL 中剔除的 GET 查询参数名列表（在合并 querys 之前执行）

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:783](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L783)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:762](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L762)

秒数，默认 300 秒
