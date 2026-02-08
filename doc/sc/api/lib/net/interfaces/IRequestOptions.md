[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:838](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L838)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:861](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L861)

cookie 托管对象

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:844](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L844)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:849](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L849)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:846](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L846)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep**: `boolean`

Defined in: [lib/net.ts:857](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L857)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:848](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L848)

***

### method?

> `optional` **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:839](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L839)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:851](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L851)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data**: `any`

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:859](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L859)

复用池名，默认为 default

***

### save?

> `optional` **save**: `string`

Defined in: [lib/net.ts:847](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L847)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:842](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L842)

秒数

***

### type?

> `optional` **type**: `"form"` \| `"json"`

Defined in: [lib/net.ts:840](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L840)
