[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / copyFolder

# Function: copyFolder()

> **copyFolder**(`from`, `to`, `ignore?`): `Promise`\<`number`\>

Defined in: [lib/fs.ts:341](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L341)

复制文件夹里的内容到另一个地方，失败不会回滚

## Parameters

### from

`string`

源，末尾加 /

### to

`string`

目标，末尾加 /

### ignore?

`RegExp`[] = `[]`

忽略的文件

## Returns

`Promise`\<`number`\>
