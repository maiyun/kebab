[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:913](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L913)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:928](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L928)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:918](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L918)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:922](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L922)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:920](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L920)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:924](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L924)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:921](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L921)

***

### proxyMode?

> `optional` **proxyMode?**: `"request"` \| `"passthrough"`

Defined in: [lib/undici.ts:915](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L915)

默认 passthrough 保留已有来源头；request 清理来源头；两者均使用目标 Host

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:930](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L930)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:926](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L926)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:917](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L917)

秒数，默认 300 秒
