[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / sendRestart

# Function: sendRestart()

> **sendRestart**(`hosts?`): `Promise`\<`string`[]\>

Defined in: [lib/core.ts:523](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L523)

向主进程（或局域网同代码机子）发送广播将进行 restart 操作，停止监听并启动新进程，老进程在连接全部断开后自行销毁
主要用作不间断的代码热更新

## Parameters

### hosts?

`string`[] | `"config"`

## Returns

`Promise`\<`string`[]\>
