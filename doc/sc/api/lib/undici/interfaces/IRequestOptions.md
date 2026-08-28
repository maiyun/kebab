[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:852](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L852)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:881](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L881)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:862](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L862)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:867](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L867)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:864](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L864)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:877](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L877)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:866](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L866)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:883](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L883)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:853](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L853)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:869](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L869)

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

### retry?

> `optional` **retry?**: `number`

Defined in: [lib/undici.ts:858](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L858)

网络异常后的重试次数，默认 0；流式请求体不可重试，非幂等请求需由调用方保证安全

***

### retryJson?

> `optional` **retryJson?**: `number`

Defined in: [lib/undici.ts:860](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L860)

JSON 解析失败后的重试次数，默认 0；仅适用于 ResponseJson 快捷方法，非幂等请求需由调用方保证安全

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:879](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L879)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:865](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L865)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L885)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:856](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L856)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:854](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L854)
