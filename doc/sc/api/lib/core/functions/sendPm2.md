[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendPm2

# Function: sendPm2()

> **sendPm2**(`name`, `action`, `hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:572](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L572)

向本机或局域网 RPC 发送 PM2 操作

## Parameters

### name

`string`

PM2 进程名称

### action

[`TPm2Action`](../type-aliases/TPm2Action.md) = `'restart'`

PM2 操作类型

### hosts?

局域网列表

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>
