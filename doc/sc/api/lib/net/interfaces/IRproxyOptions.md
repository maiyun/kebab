[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRproxyOptions

# Interface: IRproxyOptions

Defined in: [lib/net.ts:915](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L915)

反向代理请求的传入参数选项

## Properties

### filter()?

> `optional` **filter**: (`h`) => `boolean`

Defined in: [lib/net.ts:924](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L924)

过滤 header，返回 true 则留下

#### Parameters

##### h

`string`

#### Returns

`boolean`

***

### follow?

> `optional` **follow**: `number`

Defined in: [lib/net.ts:918](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L918)

***

### headers?

> `optional` **headers**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:922](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L922)

***

### hosts?

> `optional` **hosts**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:920](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L920)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### local?

> `optional` **local**: `string`

Defined in: [lib/net.ts:921](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L921)

***

### mproxy?

> `optional` **mproxy**: `object`

Defined in: [lib/net.ts:926](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L926)

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

Defined in: [lib/net.ts:932](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L932)

默认为 default

***

### timeout?

> `optional` **timeout**: `number`

Defined in: [lib/net.ts:917](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L917)

秒数
