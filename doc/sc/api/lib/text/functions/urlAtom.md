[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/text](../index.md) / urlAtom

# Function: urlAtom()

> **urlAtom**(`url`): `string`

Defined in: [lib/text.ts:289](https://github.com/maiyunnet/kebab/blob/master/lib/text.ts#L289)

将路径中的 ../ ./ 都按规范妥善处理

## Parameters

### url

`string`

要处理的地址；相对路径保留无法抵消的 .. 段

## Returns

`string`

规范化后的地址，查询和片段保持不变
