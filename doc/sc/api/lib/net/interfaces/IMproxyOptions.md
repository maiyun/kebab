[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:737](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L737)

正向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:746](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L746)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:740](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L740)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:744](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L744)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:742](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L742)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:743](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L743)

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:748](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L748)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:739](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L739)

秒数
