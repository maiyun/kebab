[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / rmdirDeep

# Function: rmdirDeep()

> **rmdirDeep**(`path`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:200](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L200)

Danger 危险：危险函数，尽量不要使用
This is a danger function, please don't use it
删除一个非空目录

## Parameters

### path

`string`

目录路径，不递归读取符号链接指向的目录

## Returns

`Promise`\<`boolean`\>

删除成功或根路径不是目录返回 true，删除失败返回 false
