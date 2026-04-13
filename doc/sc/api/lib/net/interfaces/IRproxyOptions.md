[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:944](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L944)

反向代理请求的传入参数选项

## Properties

### filter?

> `optional` **filter?**: (`h`) => `boolean`

Defined in: [lib/net.ts:953](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L953)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:947](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L947)

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:951](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L951)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:949](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L949)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:950](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L950)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:955](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L955)

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

Defined in: [lib/net.ts:963](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L963)

默认为 default

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:946](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L946)

秒数
