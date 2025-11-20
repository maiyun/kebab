[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendReload

# Function: sendReload()

> **sendReload**(`hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:483](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L483)

向主进程（或局域网同代码机子）发送广播将进行 reload 操作，等待回传
主要作用除代码热更新以外的其他情况

## Parameters

### hosts?

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>
