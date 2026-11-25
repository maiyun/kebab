[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / ILogOptions

# Interface: ILogOptions

Defined in: [lib/core.ts:1180](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1180)

log 设置的选项

## Properties

### get?

> `optional` **get?**: `Record`\<`string`, `any`\>

Defined in: [lib/core.ts:1190](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1190)

GET 查询参数

***

### headers?

> `optional` **headers?**: `IncomingHttpHeaders`

Defined in: [lib/core.ts:1192](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1192)

请求头

***

### hostname?

> `optional` **hostname?**: `string`

Defined in: [lib/core.ts:1186](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1186)

主机名，用于日志分目录，默认 system

***

### path?

> `optional` **path?**: `string`

Defined in: [lib/core.ts:1182](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1182)

当前请求路径

***

### req?

> `optional` **req?**: `IncomingMessage` \| `Http2ServerRequest` \| `null`

Defined in: [lib/core.ts:1188](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1188)

原始 HTTP 请求对象

***

### urlFull?

> `optional` **urlFull?**: `string`

Defined in: [lib/core.ts:1184](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L1184)

站点完整基础 URL
