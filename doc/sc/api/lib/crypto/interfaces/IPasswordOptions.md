[**Documents for @maiyunnet/kebab**](../../../index.md)

***

[Documents for @maiyunnet/kebab](../../../index.md) / [lib/crypto](../index.md) / IPasswordOptions

# Interface: IPasswordOptions

Defined in: [lib/crypto.ts:471](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L471)

密码散列的计算成本，未指定的选项使用默认值

## Properties

### memory?

> `optional` **memory?**: `number`

Defined in: [lib/crypto.ts:473](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L473)

内存成本，单位 KiB，默认 65536（64 MiB）；整数，至少为并行度的 8 倍，最多 262144

***

### parallelism?

> `optional` **parallelism?**: `number`

Defined in: [lib/crypto.ts:477](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L477)

并行度，默认 1；整数，范围 1～8

***

### passes?

> `optional` **passes?**: `number`

Defined in: [lib/crypto.ts:475](https://github.com/maiyunnet/kebab/blob/master/lib/crypto.ts#L475)

计算轮数，默认 3；整数，范围 1～10
