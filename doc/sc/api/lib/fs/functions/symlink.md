[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / symlink

# Function: symlink()

> **symlink**(`filePath`, `linkPath`, `type?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:132](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L132)

把源文件创建一个 link

## Parameters

### filePath

`string`

源文件

### linkPath

`string`

连接路径

### type?

仅 Windows，类型，默认 file

`"file"` | `"dir"` | `"junction"`

## Returns

`Promise`\<`boolean`\>
