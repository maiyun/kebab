[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/fs](../index.md) / pipe

# Function: pipe()

> **pipe**(`path`, `destination`, `options?`): `Promise`\<`boolean`\>

Defined in: [lib/fs.ts:431](https://github.com/maiyunnet/kebab/blob/master/lib/fs.ts#L431)

读取文件写入到流，并等待写入完成

## Parameters

### path

`string`

文件地址

### destination

`WritableStream`

要写入的流

### options?

写入后是否终止写入流，默认终止

#### end?

`boolean`

## Returns

`Promise`\<`boolean`\>
