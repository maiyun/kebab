[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IMproxyOptions

# Interface: IMproxyOptions

Defined in: [lib/net.ts:907](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L907)

正向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:916](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L916)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:910](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L910)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:914](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L914)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:912](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L912)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:913](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L913)

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:918](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L918)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:909](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L909)

秒数
