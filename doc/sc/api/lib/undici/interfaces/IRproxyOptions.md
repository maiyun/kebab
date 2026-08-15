[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:835](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L835)

反向代理请求的传入参数选项

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:854](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L854)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:844](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L844)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:838](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L838)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:842](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L842)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:840](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L840)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:841](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L841)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:846](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L846)

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

Defined in: [lib/undici.ts:856](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L856)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:858](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L858)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:837](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L837)

秒数，默认 300 秒
