[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / buildCookieQuery

# Function: buildCookieQuery()

> **buildCookieQuery**(`cookie`, `uri`): `string`

Defined in: [lib/net.ts:474](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L474)

对象转换为 Cookie 拼接字符串（会自动筛掉不能发送的 cookie）

## Parameters

### cookie

`Record`\<`string`, [`ICookie`](../interfaces/ICookie.md)\>

cookie 对象

### uri

[`IUrlParse`](../../../index/interfaces/IUrlParse.md)

请求的 URI 对象

## Returns

`string`
