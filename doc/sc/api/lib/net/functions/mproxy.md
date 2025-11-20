[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / mproxy

# Function: mproxy()

> **mproxy**(`ctr`, `auth`, `opt`): `Promise`\<`number`\>

Defined in: [lib/net.ts:582](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L582)

正向 mproxy 代理，注意提前处理不要自动处理 post 数据，读取 get 的 url 为实际请求地址
get: url, auth

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### auth

`string`

校验字符串，读取 get 的 auth 和本参数做比对

### opt

[`IMproxyOptions`](../interfaces/IMproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`number`\>
