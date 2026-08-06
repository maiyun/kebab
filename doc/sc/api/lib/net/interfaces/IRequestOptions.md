[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L706)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/net.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L731)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L712)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L717)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:714](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L714)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L727)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L716)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L733)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:707](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L707)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L719)

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

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L729)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L710)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:708](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L708)
