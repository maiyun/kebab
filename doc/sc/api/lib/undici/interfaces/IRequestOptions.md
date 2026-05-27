[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L690)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L715)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:696](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L696)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:701](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L701)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:698](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L698)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L711)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:700](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L700)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L717)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:691](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L691)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L703)

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

Defined in: [lib/undici.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L713)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:699](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L699)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L719)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:694](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L694)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:692](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L692)
