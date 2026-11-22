[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/undici.ts:982](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L982)

反向代理请求的传入参数选项

## Extends

- [`IProxyHeaderOptions`](../proxy/interfaces/IProxyHeaderOptions.md)

## Properties

### body?

> `optional` **body?**: `string` \| `Buffer`\<`ArrayBufferLike`\> \| `Readable`

Defined in: [lib/undici.ts:1005](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1005)

手动传入请求体（优先于原始 req 流），用于 req 流已消费后仍需转发 body 的场景

***

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:995](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L995)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:985](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L985)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:989](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L989)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:987](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L987)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:991](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L991)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:988](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L988)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/undici.ts:997](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L997)

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

### proxyMode?

> `optional` **proxyMode?**: `"reverse"` \| `"request"` \| `"passthrough"`

Defined in: [lib/undici/proxy.ts:14](https://github.com/maiyunnet/kebab/blob/master/lib/undici/proxy.ts#L14)

默认 passthrough 透传；request 使用目标 Host 并清理代理来源头；reverse 保留外部 Host 并生成来源头
passthrough 使用目标 Host，保留通过基础过滤的来路头，不自动生成来源头。
request/reverse 均清理传入的 Forwarded、X-Forwarded-*、Via、X-Real-IP 及 CDN 来源头。
reverse 的协议和 IP 仅取实际连接，不信任来路代理头；可信代理信息由业务验证后通过 headers 覆盖。

#### Inherited from

[`IProxyHeaderOptions`](../proxy/interfaces/IProxyHeaderOptions.md).[`proxyMode`](../proxy/interfaces/IProxyHeaderOptions.md#proxymode)

***

### querys?

> `optional` **querys?**: `Record`\<`string`, `any`\>

Defined in: [lib/undici.ts:1007](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1007)

自定义 GET 查询参数，传入后直接替换代理目标 URL 的整个 query string

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:1009](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1009)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:993](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L993)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:984](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L984)

秒数，默认 300 秒
