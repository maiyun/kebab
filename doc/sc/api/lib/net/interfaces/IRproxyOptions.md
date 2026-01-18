[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:750](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L750)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:759](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L759)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:753](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L753)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:757](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L757)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:755](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L755)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:756](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L756)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:761](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L761)

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

Defined in: [lib/net.ts:767](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L767)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:752](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L752)

秒数
