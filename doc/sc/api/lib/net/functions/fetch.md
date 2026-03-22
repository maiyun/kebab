[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / fetch

# Function: fetch()

> **fetch**(`input`, `init?`): `Promise`\<`Response`\>

Defined in: [lib/net.ts:133](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L133)

发起一个完全兼容 fetch 的请求

## Parameters

### input

`string` \| `Request` \| `URL`

请求的 URL 或 Request 对象

### init?

`RequestInit` & `object` = `{}`

增加 mproxy、hosts

## Returns

`Promise`\<`Response`\>
