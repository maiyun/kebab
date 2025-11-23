[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/zlib](../index.md) / compress

# Function: compress()

> **compress**(`types`, `buffer`, `options?`): `Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>

Defined in: [lib/zlib.ts:249](https://github.com/maiyunnet/kebab/blob/master/lib/zlib.ts#L249)

根据 types 判断用什么加密的段

## Parameters

### types

`string`

用,间隔的字符串，如 gzip,deflate

### buffer

段

`InputType` | `null`

### options?

`ZlibOptions`

选项

## Returns

`Promise`\<[`ICompressBuffer`](../interfaces/ICompressBuffer.md) \| `null`\>
