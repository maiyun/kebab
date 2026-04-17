[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:700](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L700)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:709](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L709)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:707](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L707)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:705](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L705)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:706](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L706)

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:711](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L711)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L702)

秒数
