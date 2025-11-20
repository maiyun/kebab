[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / decompress

# Function: decompress()

> **decompress**(`types`, `buffer`): `Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

Defined in: [lib/zlib.ts:290](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L290)

根据 types 判断用什么解密的段

## Parameters

### types

`string`

用,间隔的字符串，如 gzip,deflate

### buffer

段

`InputType` | `null`

## Returns

`Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>
