[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:963](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L963)

反向代理请求的传入参数选项

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:986](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L986)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:976](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L976)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:966](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L966)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:970](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L970)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:968](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L968)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:972](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L972)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:969](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L969)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:978](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L978)

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

Defined in: [lib/undici.ts:988](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L988)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:990](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L990)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:974](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L974)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:965](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L965)

秒数，默认 300 秒
