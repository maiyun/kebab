[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendStop

# Function: sendStop()

> **sendStop**(`hosts?`): `Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

Defined in: [lib/core.ts:817](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L817)

向主进程（或局域网同代码机子）发送 stop 操作，停止接收新连接并在现有连接全部结束后退出

## Parameters

### hosts?

`string`[] \| `"config"`

局域网主机列表，config 表示使用全局配置；不传时通知当前 master

## Returns

`Promise`\<`Record`\<`string`, \{ `result`: `boolean`; `return`: `string`; \}\>\>

各主机发送结果
