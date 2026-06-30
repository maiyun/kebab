[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:818](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L818)

反向代理请求的传入参数选项

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:837](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L837)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:827](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L827)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:821](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L821)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:825](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L825)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:823](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L823)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:824](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L824)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:829](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L829)

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

Defined in: [lib/undici.ts:839](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L839)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:841](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L841)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:820](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L820)

秒数，默认 300 秒
