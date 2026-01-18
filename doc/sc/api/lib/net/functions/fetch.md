[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / fetch

# Function: fetch()

> **fetch**(`input`, `init`): `Promise`\<`Response`\>

Defined in: [lib/net.ts:131](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L131)

发起一个原生 fetch 请求，增加了一些框架选项，注意：会抛出错误

## Parameters

### input

请求的 URL 或 Request 对象

`string` | `Request` | `URL`

### init

`RequestInit` & `object` = `{}`

增加 mproxy

## Returns

`Promise`\<`Response`\>
