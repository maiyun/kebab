[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/undici.ts:636](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L636)

反向代理，注意提前处理不要自动处理 post 数据，将本服务器的某个路由反代到其他网址

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### route

`Record`\<`string`, `string`\>

要反代的路由

### opt?

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>
