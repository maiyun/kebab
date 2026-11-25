[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:998](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L998)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:1016](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1016)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:1004](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1004)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:1010](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1010)

自定义请求头

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:1006](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1006)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:1012](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1012)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:1008](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1008)

使用的本地网卡 IP

***

### proxyMode?

> `optional` **proxyMode?**: `"request"` \| `"passthrough"`

Defined in: [lib/undici.ts:1000](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1000)

默认 passthrough 保留已有来源头；request 清理来源头；两者均使用目标 Host

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:1018](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1018)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:1014](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1014)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:1002](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L1002)

秒数，默认 300 秒
