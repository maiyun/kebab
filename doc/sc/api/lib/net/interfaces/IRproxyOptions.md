[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:880](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L880)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:889](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L889)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:883](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L883)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:887](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L887)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L885)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:886](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L886)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:891](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L891)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data**: `any`

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse**: `string`

Defined in: [lib/net.ts:897](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L897)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:882](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L882)

秒数
