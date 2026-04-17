[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:672](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L672)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:697](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L697)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:678](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L678)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:683](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L683)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:680](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L680)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:693](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L693)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:682](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L682)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:699](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L699)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L673)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:685](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L685)

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

Defined in: [lib/undici.ts:695](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L695)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:681](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L681)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:676](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L676)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:674](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L674)
