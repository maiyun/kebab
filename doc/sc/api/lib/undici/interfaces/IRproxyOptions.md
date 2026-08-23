[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L885)

反向代理请求的传入参数选项

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L904)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:894](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L894)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:888](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L888)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:892](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L892)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:890](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L890)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:891](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L891)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:896](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L896)

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

Defined in: [lib/undici.ts:906](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L906)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:908](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L908)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:887](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L887)

秒数，默认 300 秒
