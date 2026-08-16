[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/core](../index.md) / exec

# Function: exec()

> **exec**(`command`, `options?`): `Promise`\<`string` \| `false`\>

Defined in: [lib/core.ts:680](https://github.com/maiyunnet/kebab/blob/master/lib/core.ts#L680)

执行命令行

## Parameters

### command

`string`

命令字符串

### options?

#### cwd?

`string`

#### timeout?

`number`

命令超时毫秒数，超时后终止命令并以失败返回
默认无超时限制：不传时命令可一直运行直至完成，与 cp.exec 默认行为一致

## Returns

`Promise`\<`string` \| `false`\>
