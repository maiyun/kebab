[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L904)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:913](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L913)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:907](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L907)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:911](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L911)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:909](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L909)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:910](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L910)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:915](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L915)

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

Defined in: [lib/net.ts:921](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L921)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:906](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L906)

秒数
