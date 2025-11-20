[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L702)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:723](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L723)

cookie 托管对象

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:708](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L708)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L713)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L710)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L712)

***

### method?

> `optional` **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

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

Defined in: [lib/net.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L721)

默认为 default

***

### save?

> `optional` **save**: `string`

Defined in: [lib/net.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L711)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L706)

秒数

***

### type?

> `optional` **type**: `"form"` \| `"json"`

Defined in: [lib/net.ts:704](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L704)
