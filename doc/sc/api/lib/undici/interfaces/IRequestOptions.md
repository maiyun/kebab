[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:747](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L747)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:772](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L772)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:753](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L753)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:758](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L758)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:755](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L755)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:768](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L768)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:757](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L757)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:774](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L774)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:748](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L748)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:760](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L760)

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

Defined in: [lib/undici.ts:770](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L770)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:756](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L756)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:776](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L776)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:751](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L751)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:749](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L749)
