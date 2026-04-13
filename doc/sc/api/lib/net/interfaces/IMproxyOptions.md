[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:929](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L929)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:938](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L938)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:932](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L932)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:936](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L936)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:934](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L934)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:935](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L935)

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:940](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L940)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:931](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L931)

秒数
