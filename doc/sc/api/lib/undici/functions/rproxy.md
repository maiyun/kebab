[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/undici](../index.md) / rproxy

# Function: rproxy()

> **rproxy**(`ctr`, `route`, `opt?`): `Promise`\<`boolean`\>

Defined in: [lib/undici.ts:649](https://github.com/maiyunnet/kebab/blob/master/lib/undici.ts#L649)

反向代理，将本服务器的某个路由反代到其他网址

## 使用方式

### 方式 1：在 onReqStart 中调用（完全反代）
请求体未被消费，POST body 会完整转发到上游。

### 方式 2：在控制器方法中调用（按需反代）
此时可复用控制器的私有方法做前置处理：
- 如果 req 流尚未消费，body 会自动转发。
- 如果 req 流已消费，可通过 opt.body 手动传入请求体。
- opt.body 优先级高于 req 流。

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
