[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:871](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L871)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:880](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L880)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:874](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L874)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:878](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L878)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:876](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L876)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:877](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L877)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:882](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L882)

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

Defined in: [lib/net.ts:888](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L888)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:873](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L873)

秒数
