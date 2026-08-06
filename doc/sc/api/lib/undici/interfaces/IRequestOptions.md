[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:785](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L785)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:810](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L810)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:791](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L791)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:796](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L796)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:793](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L793)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:806](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L806)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:795](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L795)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:812](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L812)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:786](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L786)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:798](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L798)

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

Defined in: [lib/undici.ts:808](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L808)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:794](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L794)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:814](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L814)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:789](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L789)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:787](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L787)
