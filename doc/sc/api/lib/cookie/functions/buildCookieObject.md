[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/cookie](../index.md) / buildCookieObject

# Function: buildCookieObject()

> **buildCookieObject**(`cookie`, `setCookies`, `uri`): `Promise`\<`void`\>

Defined in: [lib/cookie.ts:46](https://github.com/maiyunnet/kebab/blob/master/lib/cookie.ts#L46)

根据 Set-Cookie 头部转换到 cookie 对象

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

### setCookies

`string`[]

头部的 set-cookie 数组

### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

请求的 URI 对象

## Returns

`Promise`\<`void`\>
