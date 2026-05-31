[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:725](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L725)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:750](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L750)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L731)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:736](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L736)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L733)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:746](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L746)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:735](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L735)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:752](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L752)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L726)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:738](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L738)

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

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:748](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L748)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L734)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:754](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L754)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:729](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L729)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:727](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L727)
