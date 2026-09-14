[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:962](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L962)

反向代理请求的传入参数选项

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:985](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L985)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:975](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L975)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:965](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L965)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:969](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L969)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:967](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L967)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:971](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L971)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:968](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L968)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:977](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L977)

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

Defined in: [lib/undici.ts:987](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L987)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:989](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L989)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:973](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L973)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:964](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L964)

秒数，默认 300 秒
