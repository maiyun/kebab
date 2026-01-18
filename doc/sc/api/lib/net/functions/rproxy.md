[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/net](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt`): `Promise`\<`boolean`\>

Defined in: [lib/net.ts:655](https://github.com/maiyunnet/kebab/blob/master/lib/net.ts#L655)

反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### route

`Record`\<`string`, `string`\>

要反代的路由

### opt

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>
