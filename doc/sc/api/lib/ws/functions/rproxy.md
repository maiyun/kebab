[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/ws](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `url`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/ws.ts:546](https://github.com/maiyunnet/kebab/blob/master/lib/ws.ts#L546)

反向代理，将本 socket 连接反代到其他网址，在 ws 的 onLoad 事件中使用

## Parameters

### ctr

[`Ctr`](../../../sys/ctr/classes/Ctr.md)

当前控制器

### url

`string`

反代真实请求地址，如有 get 需要自行添加

### opt?

[`IRproxyOptions`](../interfaces/IRproxyOptions.md) = `{}`

参数

## Returns

`Promise`\<`boolean`\>
