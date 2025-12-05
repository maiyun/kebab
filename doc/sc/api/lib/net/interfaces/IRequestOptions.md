[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L726)

cookie 托管对象

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:709](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L709)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:714](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L714)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L711)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep**: `boolean`

Defined in: [lib/net.ts:722](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L722)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L713)

***

### method?

> `optional` **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:704](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L704)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L716)

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

Defined in: [lib/net.ts:724](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L724)

复用池名，默认为 default

***

### save?

> `optional` **save**: `string`

Defined in: [lib/net.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L712)

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:707](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L707)

秒数

***

### type?

> `optional` **type**: `"form"` \| `"json"`

Defined in: [lib/net.ts:705](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L705)
