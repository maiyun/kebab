[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/undici.ts:900](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L900)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/undici.ts:935](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L935)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:912](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L912)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:917](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L917)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:914](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L914)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/undici.ts:927](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L927)

连接是否保持长连接（即是否允许复用），默认为 true

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:929](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L929)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒；自定义 Agent 由其自身配置

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:916](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L916)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/undici.ts:937](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L937)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/undici.ts:901](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L901)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:919](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L919)

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

Defined in: [lib/undici.ts:906](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L906)

网络异常后的重试次数，默认 0；流式请求体不可重试，非幂等请求需由调用方保证安全

***

### retryJson?

> `optional` **retryJson?**: `number`

Defined in: [lib/undici.ts:908](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L908)

JSON 解析失败后的重试次数，默认 0；仅适用于 ResponseJson 快捷方法，非幂等请求需由调用方保证安全

***

### retryJsonHandler?

> `optional` **retryJsonHandler?**: (`json`) => `boolean`

Defined in: [lib/undici.ts:910](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L910)

JSON 重试验证方法；返回 false 时按 retryJson 的设置重试，仅适用于 ResponseJson 快捷方法

#### Parameters

##### json

`any`

#### Returns

`boolean`

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:933](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L933)

复用池名/Agent，默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:931](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L931)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制；自定义 Agent 由其自身配置

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/undici.ts:915](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L915)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [lib/undici.ts:939](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L939)

请求中止信号

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L904)

秒数，默认 300 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/undici.ts:902](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L902)
