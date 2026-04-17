[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:724](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L724)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:718](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L718)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:722](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L722)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:720](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L720)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:721](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L721)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:726](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L726)

正向 mproxy 代理，url 如 https://xxx/abc

#### auth

> **auth**: `string`

#### data?

> `optional` **data?**: `any`

#### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

落地端自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

#### url

> **url**: `string`

***

### reuse?

> `optional` **reuse?**: `string`

Defined in: [lib/net.ts:734](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L734)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L717)

秒数
