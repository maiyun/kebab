[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:853](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L853)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:884](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L884)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:865](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L865)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:870](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L870)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:867](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L867)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:880](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L880)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:869](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L869)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:886](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L886)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:854](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L854)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:872](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L872)

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

Defined in: [lib/undici.ts:859](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L859)

网络异常后的重试次数，默认 0；流式请求体不可重试，非幂等请求需由调用方保证安全

***

### retryJson?

> `optional` **retryJson?**: `number`

Defined in: [lib/undici.ts:861](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L861)

JSON 解析失败后的重试次数，默认 0；仅适用于 ResponseJson 快捷方法，非幂等请求需由调用方保证安全

***

### retryJsonHandler?

> `optional` **retryJsonHandler?**: (`json`) => `boolean`

Defined in: [lib/undici.ts:863](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L863)

JSON 重试验证方法；返回 false 时按 retryJson 的设置重试，仅适用于 ResponseJson 快捷方法

#### Parameters

##### json

`any`

#### Returns

`boolean`

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:882](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L882)

复用池名/Agent，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:868](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L868)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:888](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L888)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:857](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L857)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:855](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L855)
