[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:862](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L862)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L885)

cookie 托管对象

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:868](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L868)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:873](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L873)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:870](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L870)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep**: `boolean`

Defined in: [lib/net.ts:881](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L881)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:872](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L872)

***

### method?

> `optional` **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:863](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L863)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:875](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L875)

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

Defined in: [lib/net.ts:883](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L883)

复用池名，默认为 default

***

### save?

> `optional` **save**: `string`

Defined in: [lib/net.ts:871](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L871)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:866](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L866)

秒数

***

### type?

> `optional` **type**: `"form"` \| `"json"`

Defined in: [lib/net.ts:864](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L864)
