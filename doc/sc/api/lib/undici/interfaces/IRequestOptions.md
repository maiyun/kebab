[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:710](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L710)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:735](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L735)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:716](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L716)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L721)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:718](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L718)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:731](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L731)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:720](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L720)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:737](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L737)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L711)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:723](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L723)

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

Defined in: [lib/undici.ts:733](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L733)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L719)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:739](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L739)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:714](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L714)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:712](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L712)
