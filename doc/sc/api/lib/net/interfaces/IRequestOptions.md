[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / IRequestOptions

# Interface: IRequestOptions

Defined in: [lib/net.ts:898](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L898)

请求的传入参数选项

## Properties

### cookie?

> `optional` **cookie?**: `Record`\<`string`, [`ICookie`](ICookie.md)\>

Defined in: [lib/net.ts:923](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L923)

cookie 托管对象

***

### follow?

> `optional` **follow?**: `number`

Defined in: [lib/net.ts:904](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L904)

追踪 location 次数，0 为不追踪，默认为 0

***

### headers?

> `optional` **headers?**: [`THttpHeaders`](../type-aliases/THttpHeaders.md)

Defined in: [lib/net.ts:909](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L909)

***

### hosts?

> `optional` **hosts?**: `string` \| `Record`\<`string`, `string`\>

Defined in: [lib/net.ts:906](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L906)

自定义 host 映射，如 {'www.maiyun.net': '127.0.0.1'}，或全部映射到一个 host

***

### keep?

> `optional` **keep?**: `boolean`

Defined in: [lib/net.ts:919](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L919)

连接是否保持长连接（即是否允许复用），默认为 true

***

### local?

> `optional` **local?**: `string`

Defined in: [lib/net.ts:908](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L908)

***

### log?

> `optional` **log?**: `boolean`

Defined in: [lib/net.ts:925](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L925)

若有异常写入文件日志，默认为 true

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"` \| `"OPTIONS"`

Defined in: [lib/net.ts:899](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L899)

***

### mproxy?

> `optional` **mproxy?**: `object`

Defined in: [lib/net.ts:911](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L911)

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

Defined in: [lib/net.ts:921](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L921)

复用池名，默认为 default

***

### save?

> `optional` **save?**: `string`

Defined in: [lib/net.ts:907](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L907)

***

### timeout?

> `optional` **timeout?**: `number`

Defined in: [lib/net.ts:902](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L902)

秒数

***

### type?

> `optional` **type?**: `"form"` \| `"json"`

Defined in: [lib/net.ts:900](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L900)
