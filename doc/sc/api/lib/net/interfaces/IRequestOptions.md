[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:669](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L669)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/net.ts:694](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L694)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:675](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L675)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:680](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L680)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:677](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L677)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:690](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L690)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:679](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L679)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:696](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L696)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:670](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L670)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:682](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L682)

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

Defined in: [lib/net.ts:692](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L692)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:678](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L678)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:673](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L673)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:671](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L671)
