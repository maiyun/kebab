[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/undici.ts:943](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L943)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/undici.ts:956](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L956)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/undici.ts:946](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L946)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/undici.ts:950](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L950)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/undici.ts:948](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L948)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keepAliveTimeout?

> `optional` **keepAliveTimeout?**: `number`

Defined in: [lib/undici.ts:952](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L952)

空闲连接允许复用的最长秒数；非正数或无效值按未设置处理；默认无服务端提示时为 4 秒，有提示时采用提示值减 2 秒且最多 600 秒

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/undici.ts:949](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L949)

***

### reuse?

> `optional` **reuse?**: `string` \| `Agent` \| `ProxyAgent`

Defined in: [lib/undici.ts:958](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L958)

默认为 default

***

### reuseTimeout?

> `optional` **reuseTimeout?**: `number`

Defined in: [lib/undici.ts:954](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L954)

连接建立后允许承接新请求的最长秒数；非正数或无效值按未设置处理；达到后不再复用但不会中断在途请求，默认不限制

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/undici.ts:945](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L945)

秒数，默认 300 秒
