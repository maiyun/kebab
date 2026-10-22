[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:944](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L944)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:957](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L957)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:947](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L947)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:951](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L951)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:949](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L949)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:953](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L953)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:950](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L950)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:959](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L959)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:955](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L955)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:946](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L946)

秒数，默认 300 秒
