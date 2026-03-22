[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:876](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L876)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:901](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L901)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:882](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L882)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:887](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L887)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:884](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L884)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:897](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L897)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:886](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L886)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:903](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L903)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:877](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L877)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:889](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L889)

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

Defined in: [lib/net.ts:899](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L899)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:885](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L885)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:880](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L880)

秒数

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:878](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L878)
