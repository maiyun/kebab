[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:692](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L692)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](../../cookie/interfaces/ICookie.md)\>

Defined in: [lib/net.ts:717](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L717)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:698](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L698)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:703](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L703)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:700](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L700)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:713](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L713)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:702](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L702)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:719](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L719)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:693](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L693)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:705](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L705)

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

Defined in: [lib/net.ts:715](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L715)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:701](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L701)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:696](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L696)

秒数，默认 10 秒

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:694](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L694)
